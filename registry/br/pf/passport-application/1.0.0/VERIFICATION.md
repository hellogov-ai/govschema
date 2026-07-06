# Verification record — `br/pf/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read live source**: the Federal
Police's own SINPA (Sistema Nacional de Passaportes) online passport-request
wizard, read field-by-field from the live, unauthenticated DOM. It remains
`draft`, not `verified`, pending an independent second reviewer's field-by-field
pass.

## Why this document exists

This cycle (`GOV-1364`, the recurring `GovSchema Standard Research` routine)
picked up Brazil's remaining un-scouted verticals. Brazil opened as the
registry's 15th jurisdiction under `GOV-1342`/`GOV-1296` with a single
Business Formation schema (`br/sp/jucesp/cnpj-registration-dbe`); its Passport,
DMV, Visa, and National ID verticals had not yet been researched (its only
other candidate, `GOV-1295` — Receita Federal individual income tax — was
found too fragmentary to source safely and remains open in the backlog, not
attempted again this cycle). This cycle scouted Brazil's Passport process and
found a genuinely strong source: the Polícia Federal's own live online
application wizard, reachable with no login, no CAPTCHA, and no IP block.

## Source examined

- **Document `(id, version)`:** `br/pf/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Polícia Federal — Divisão de Passaporte, Coordenação-Geral de
  Polícia de Imigração
- **Primary source URL:**
  <https://servicos.pf.gov.br/sinpa/inicializacaoSolicitacao.do?dispatch=inicializarSolicitacaoPassaporte>
  ("Nova solicitação de passaporte" / New passport request)
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

Unlike most prior cycles' PDF/StreamDocs/screenshot-vision techniques, SINPA
is a genuinely live, unauthenticated, four-tab HTML wizard (Dados pessoais /
Documentos / Dados complementares / Revisar dados) with no CAPTCHA and no
gov.br SSO gate — the strongest sourcing shape available: the actual page DOM,
not a rendered image of it. Worked per
`[[browser-screenshots-setup]]` (Playwright-core + Chromium already installed
at `/tmp/shotter` from a prior cycle, `LD_LIBRARY_PATH` pointed at
`/paperclip/chrome-sysroot`):

1. Navigated directly to the wizard's entry URL. `networkidle` load, no
   redirect to any login page.
2. All four tabs' HTML (including the later Documentos/Dados
   complementares/Revisar dados tabs, which are shown/hidden client-side
   rather than lazily fetched) are present in a single page load. Ran
   `document.querySelectorAll('input, select, textarea')` across the full DOM
   and recorded every element's `id`, `name`, `type`, `maxLength`, associated
   label text, and (for `<select>`) every `<option>`'s underlying `value` and
   visible `text` — not a truncated or paraphrased list.
3. Screenshotted each of the four tabs directly (clicking the tab headers,
   which does not require passing client-side validation the way the
   "PRÓXIMO" step buttons do) to corroborate the extracted field inventory
   against the rendered layout and confirm section groupings/labels.
4. Confirmed the CPF field (`___.___.___-__`) and CEP field (`_____-___`)
   input masks directly from the rendered screenshots, grounding this
   document's `cpf`/`postalCode` `pattern` validation.
5. Read the exact worked example text next to the previous-passport
   series/number fields verbatim from the screenshot ("Exemplo: Para o
   passaporte CP999999 a série é CP e o número é 999999"), now reproduced in
   `previousPassportSeries`/`previousPassportNumber`'s `description`.
6. Did **not** click the final "ENVIAR" (submit) button at any point, and did
   not fill in any field with a real person's data — per `GOVERNANCE.md`,
   GovSchema describes and verifies processes, it does not submit them. Two
   supporting pages (`gov.br/pt-br/servicos/obter-passaporte-comum-para-brasileiro`,
   `gov.br/pf/pt-br/assuntos/passaporte/documentacao/formulario/preenchendo`)
   were also fetched directly to corroborate the overall process narrative
   (protocol number → GRU fee payment → in-person biometric appointment →
   pickup) described in this document's top-level `description`.

## What was confirmed directly (verbatim, from the live DOM)

- **Dados pessoais tab:** every field id/name/maxlength listed above;
  `sexo`'s three coded option values (`M`/`F`/`X`); `racaCor`'s eight IBGE
  categories with their numeric option codes; `estadoCivil`'s six categories;
  the "Local de nascimento" country/UF/city cascading structure, including the
  distinct free-text city field used only when the country of birth isn't
  Brazil; the "Nomes anteriores" previous-name-plus-reason-dropdown pattern
  (three reason codes).
- **Documentos tab:** the "Documento de Identificação" (RG) sub-block; the CPF
  and CPF-do-responsável fields (the latter deliberately excluded from this
  document — see Out of scope); the "Certidão" sub-block including the
  disabled-until-checked `Matrícula` field for the new unified certificate
  model, and the type/number/book/page/registry-office/state/city fields; the
  "Passaporte Anterior" `Situação*` dropdown's **all seven** option values
  verbatim, which is the field that lets one wizard cover first-time,
  renewal, lost, stolen, and retained-by-authority scenarios without a
  separate form per scenario — this is the central structural finding of this
  document.
- **Dados complementares tab:** the large CBO occupation dropdown (confirmed
  large/closed, not enumerated per the `au/apo`-style precedent for
  free-text-modeled closed country/occupation dropdowns); the email +
  email-confirmation pair (grounding the `emailMatchesConfirmation`
  `crossFieldValidation` rule); the address sub-block's country/CEP/UF/city
  cascading structure (mirroring the birth-place structure) plus
  logradouro/bairro/DDD/telefone.
- **Revisar dados tab:** the mandatory declaration checkbox text verbatim
  ("Declaro que as informações acima estão corretas e que estou ciente de que
  qualquer erro nos dados implicará em atraso na emissão do meu documento de
  viagem."), and the ICAO-surname-truncation warning now reflected in
  `fullName`'s `description`.

## What is out of scope for v1.0.0

- **Applicants under 18.** The wizard is the same for a minor applicant, but
  the DOM additionally carries `cpfResponsavel` (CPF of the responsible
  party), an `autorizacaoViagem` three-option radio group (a minor's
  travel-authorization election), and `paisNacionalidadeFiliacao1`/`2` (each
  parent's nationality) — none of which are modeled here. These fields sit on
  the Documentos/Dados complementares tabs and are always present in the DOM
  (the tab-based show/hide made it impractical to confirm, within this
  cycle's time budget, the exact client-side age threshold that reveals
  them), so this document is deliberately scoped to an applicant who will be
  18 or older rather than guessing at the minor-specific conditional logic.
  A follow-up cycle could re-render with a `page.selectOption`/blur-driven
  age check to confirm the exact trigger and add a `br/pf/passport-application-minor`
  companion document.
- **`checkEmancipado`/`checkAdocaoInternacional`** are included as fields
  (`isEmancipatedMinor`/`isInternationalAdoption`) since they are static,
  always-visible checkboxes on the Dados pessoais tab regardless of computed
  age — these are genuinely in scope.
- **Physical document checklist, GRU fee payment, and appointment booking.**
  The wizard itself states it generates "a personalized document checklist"
  after the data-entry steps and that a separate GRU (Guia de Recolhimento da
  União) payment and in-person biometric appointment follow — none of this is
  part of the online wizard modeled here, and no fee amount is encoded (fees
  change; not stated on the wizard itself either).
- **`documents[]` (GSP-0014).** The concrete physical-document checklist
  (RG original, birth/marriage certificate original, etc.) is generated
  dynamically by the live system after this wizard's data is submitted and
  was not independently sourced this cycle (a candidate source,
  `gov.br/pf/pt-br/assuntos/passaporte/documentacao/lista-brasileiro`, is
  noted for a follow-up cycle). Left absent rather than guessed.
- **Help-tooltip content** behind the three orange "?" icons (Documento de
  Identificação, Certidão, Passaporte Anterior sections) — clicking them in
  headless Chromium did not reliably surface a distinct DOM overlay within
  this cycle's time budget; every field this document models was confirmed
  from the base form fields/labels/options directly, not from tooltip
  content, so this gap does not affect field accuracy, only some
  possibly-richer field descriptions.
- **Brazil's other three verticals** (DMV, Visa, National ID) remain
  unresearched — candidates for a future cycle.

## Mock-data conformance check (Phase 4)

A fabricated, non-submitting mock application packet lives at
`conformance/br/pf/passport-application/1.0.0/application-packet.json` (+
`.txt` rendering). It was run against every `requiredWhen`/`crossFieldValidation`
rule in this schema with a small mutation-testing script (baseline plus 10
deliberately-broken variants: missing conditional Brazil-birth fields, missing
conditional abroad-birth field, missing previous-passport series/number when a
prior passport is held, missing the new-model certificate registration number,
a mismatched email confirmation, a `false` declaration, an invalid CPF
pattern, and an invalid enum value) — every variant produced exactly the
expected violation, and the unmodified baseline produced none. This document
was **not** submitted to `servicos.pf.gov.br` or any other live system at any
point, per `GOVERNANCE.md`.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-render the same live SINPA wizard, re-check every
`sourceRef` against it field by field, confirm the minor-applicant conditional
logic (see Out of scope), and confirm no newer wizard revision has changed the
field set.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this is the registry's first Brazilian Passport document and the
first document in this registry sourced by direct live-DOM extraction rather
than a PDF/image/screenshot technique — the shorter end of the cadence is
appropriate until the technique and the minor-applicant scope boundary are
independently confirmed. Re-check the source, and confirm no newer wizard
revision has been published, on or before that date and on any `source.url`
change.
