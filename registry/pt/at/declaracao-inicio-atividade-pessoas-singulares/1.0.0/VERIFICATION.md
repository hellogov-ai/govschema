# Verification record — `pt/at/declaracao-inicio-atividade-pessoas-singulares` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2143). Its own
phased brief names the same six generic verticals (DMV, Business Formation,
Visa, Passport, Taxes, National ID & Civic Documents) every prior cycle of
this recurring issue has already named, plus four specific National ID & Civic
Documents candidates (DE Steuer-ID, SG NRIC loss/damage + re-registration, NZ
RealMe, "remaining voter registration"). All four were re-checked first and
re-confirmed already resolved: `de/finanzamt/tax-identification-number`,
`sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
and `nz/dia/realme-verified-identity` are all published; the registry's own
voter-registration coverage across all 31 jurisdictions was re-surveyed this
cycle (`find registry -iname '*voter*' -o -iname '*electoral*'`) and every
jurisdiction without a schema already has a documented dead-end or
election-cycle-scoped-closed finding in CATALOG.md's own "Confirmed dead
ends" section (AE: no general voter-registration process; BR: TSE register
suspended through 2026-11-03; MX: INE credencial requires an in-person
biometric appointment; CO: overseas-voter microsite decommissioned; etc.) —
consistent with this same finding in every one of GOV-2005, GOV-2019,
GOV-2026, GOV-2042, and other recent cycles of this recurring issue. Per this
registry's established precedent, the brief's own generic phasing was
therefore treated as a prompt to re-scan CATALOG.md's own "Known Gaps &
Opportunities" section fresh, not as a literal, always-current to-do list.

That section's own item 1/3 flagged **Portugal's Business Formation
vertical** as Portugal's sole remaining open gap (Portugal stood at 5 of its
6 verticals — Passport, DMV, Taxes, Visa, National ID all published — after
GOV-1833/GOV-1797), twice re-screened and twice set aside (GOV-1750,
GOV-1797) as "a real but comparatively weak backlog candidate," not a
confirmed dead end. This cycle picked it up directly.

## Sources examined

- **Document `(id, version)`:** `pt/at/declaracao-inicio-atividade-pessoas-singulares` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Autoridade Tributária e Aduaneira (AT), operating under the
  Ministério das Finanças (`portaldasfinancas.gov.pt`).
- **Candidate 1 (re-screened, re-confirmed a dead end): IRN's "Empresa na
  Hora" / "Empresa Online" pacto-social specimens.** The two prior cycles'
  finding ("scanned images with no extractable text layer") was re-verified
  from scratch rather than trusted: fetched
  `https://justica.gov.pt/Servicos/Empresa-na-Hora/Pactos` live (HTTP 200),
  which lists six pre-approved pacto-social model PDFs (SUQ-1-08, SQ-1-06-II,
  SQ-2-06-II, SA-06-II, SA-08-II, SA-15) at `justica.gov.pt/Portals/0/`. The
  most common single-founder case, **SUQ-1-08** (Sociedade Unipessoal por
  Quotas), was fetched directly (`curl` with a realistic desktop
  User-Agent, HTTP 200, 687,898 bytes, 7 pages) and extracted with
  `pdfjs-dist` (`getTextContent()` per page, `getAnnotations()` per page): **0
  characters of text and 0 annotations across all 7 pages** — a pure
  scanned-image PDF with no AcroForm layer and no text layer whatsoever,
  independently re-confirming the prior cycles' finding rather than merely
  repeating it. Not pursued further.
- **Candidate 2 (screened, rejected as too narrow): OCC's "MINUTA DE PACTO
  SOCIAL DE SOCIEDADE POR QUOTAS"** (`occ.pt/fotos/editor2/minutapactosocialsp.doc`,
  a Word/RTF fill-in-the-blank template). Fetched and read: this template's
  own Article 3 restricts its purpose exclusively to "the exercise in common
  of the profession of Certified Accountant" per Decree-Law 452/99 — a
  professional-society (sociedade de profissionais) template for certified
  accountants specifically, not a general-purpose company-formation
  template. Rejected as out of scope for a general Business Formation
  schema.
- **Candidate 3 (screened, rejected as too narrow a legal explainer): OCC's
  "Guia Prático — Sociedades Comerciais: Constituição e Início de
  Atividade"** (`occ.pt/sites/default/files/public/2023-09/Guia_Pratico%20-%20SocComA1.pdf`,
  57 pp., dated setembro 2023). Fetched and extracted with `pdfjs-dist`
  (86,775 characters across 57 pages — a genuine text-layer PDF, unlike
  Candidate 1). Its own table of contents (§5 "DO PACTO SOCIAL", §6 "DA
  FIRMA", §7 "DAS OBRIGAÇÕES DE ENTRADA", §11 "O CAPITAL SOCIAL", each keyed
  to specific Código das Sociedades Comerciais (CSC) articles) confirmed this
  is a legal explainer/practical commentary on the CSC's own provisions, not
  a field-by-field walkthrough of a specific application form or online
  wizard with concrete field labels and screenshots. Consistent with
  GOV-1750's own note that "the Código das Sociedades Comerciais statute
  itself enumerates a thin ~14-16 field list" — a real but comparatively
  weak basis to author against directly, since this guide paraphrases and
  cross-references statute provisions rather than presenting them as a
  discrete list. Not pursued as the primary source for this schema.
- **Candidate 4 (selected): AT's own "Início de Atividade" informational
  leaflet** —
  <https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Folhetos_informativos/Documents/Inicio_atividade.pdf>
  ("INÍCIO DE ATIVIDADE — Rendimentos empresariais e profissionais - IRS e
  IVA", 15 pp., dated **março 2026** — the current edition). Fetched live
  (HTTP 200, 1,048,576-byte range observed, no login/CAPTCHA/WAF gate) and
  extracted with `pdfjs-dist`: a genuine text layer across all 15 pages
  (page-length text counts ranging 73–2,996 characters per page), unlike the
  companion "Início de Atividade" folheto at the same info.portaldasfinancas.gov.pt
  host referenced by a separate search result, whose own PDF stream markers
  (`JPXDecode`) indicate embedded JPEG2000 images rather than a scanned page
  — this leaflet's own content is genuine extracted text, not an image
  rendering. This is the sole-trader "Início de Atividade" candidate the
  prior two cycles (GOV-1750, GOV-1797) had each screened only as far as
  "the sole-trader 'Início de Atividade' self-service route remains a fully
  authenticated acesso.gov.pt wizard with no PDF fallback found" — true of
  the live wizard itself, but this leaflet is a distinct, previously
  unidentified official source describing that wizard's own field content in
  AT's own words, not a PDF fallback of the wizard itself. This is the same
  "official leaflet documenting a gated wizard's field content" pattern
  already used by this registry (e.g. the field content behind
  `se/migrationsverket/work-permit-application`'s own authenticated portal).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation / access notes

None of the sources above required any authentication, CAPTCHA-solving, or
WAF workaround to fetch their own text/PDF content (only the live
`acesso.gov.pt`-gated submission wizard itself remains authenticated, which
is expected and unchanged from the prior cycles' own finding — this schema
models the leaflet's documented field content, not a live session capture).
`node tools/verify-sources.mjs registry/pt/at/declaracao-inicio-atividade-pessoas-singulares/1.0.0`
reports "1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all
clear" — confirmed directly, immediately before opening this PR.

## Extraction method

The selected leaflet (Candidate 4) was extracted with `pdfjs-dist` (a
throwaway `/tmp` scratch install, not added to this repo's tracked
`package.json`) via `getTextContent()` per page; Candidate 1's rejected
SUQ-1-08 specimen was extracted the same way to independently re-confirm its
zero-text/zero-annotation finding; Candidate 3's OCC guide was extracted the
same way to confirm its own legal-explainer structure via its table of
contents. No AcroForm/Widget-based extraction was applicable to any of the
four candidates: Candidate 1 has no text or form layer at all; Candidates 3
and 4 are plain reference/informational PDFs with no fillable widgets
(consistent with the underlying process being a live, session-authenticated
online wizard, not a paper form).

## What the leaflet maps to

The leaflet's own "DECLARAÇÕES DE ATIVIDADE" section states verbatim, under
"Declaração de Início de Atividade": *"Antes da entrega, deve identificar:
1. Código(s) de atividade que vai exercer... 2. Volume estimado de negócios
até ao final do ano... 3. IBAN e BIC/SWIFT de uma conta bancária em seu
nome..."* — this schema models exactly those three enumerated items, plus
two supporting facts the same section explicitly ties to item 2's own
computation, and the anticipated start date the surrounding prose ties to
the declaration's own filing deadline:

- **Item 1 ("Código(s) de atividade")** → `primaryActivityCode` (required)
  and `secondaryActivityCodes` (optional, comma-separated — GovSchema v0.3
  has no array/repeating field type; see SPEC.md §6.3, and this registry's
  precedent, e.g. `sg/spf/driving-licence-application`'s licence-class
  field). Modelled as free text rather than an enum: the leaflet cites two
  code tables (art.º 151.º do CIRS for professional activities; CAE — Rev. 4
  per Portaria n.º 1011/2001) together listing well over a thousand codes,
  neither reproduced by the leaflet itself.
- **The mixed-operations note** ("Caso indique que exerce, simultaneamente,
  operações sujeitas a tributação e operações isentas ao abrigo do art.º
  9.º... deve indicar, apenas, o volume de negócios previsto para a(s)
  atividade(s) tributada(s)") → `hasMixedTaxedAndExemptActivities` (optional
  boolean), disclosed in `estimatedAnnualTurnover`'s own description as
  gating how that value should be computed rather than modelled as a
  separate `requiredWhen`/`crossFieldValidation` construct, since the
  leaflet states an instruction for the declarant to follow when computing
  one value, not a rule this registry can mechanically verify without the
  declarant's own underlying activity-level figures.
- **Item 2 ("Volume estimado de negócios até ao final do ano")** →
  `estimatedAnnualTurnover` (required, `minimum: 0`). The leaflet is explicit
  this is *not* an annualised full-year figure but "o previsto para o
  período que resta do ano em que se verifica o início de atividade" (the
  estimate for the remainder of the year from the start date) — disclosed in
  the field's own description rather than left ambiguous.
- **Item 3 ("IBAN e BIC/SWIFT de uma conta bancária em seu nome")** →
  `bankAccountIBAN` (required) and `bankAccountBIC` (required), modelled as
  two fields since they are two independently-named identifiers for the same
  account.
- **The declaration's own filing deadline framing** ("deve apresentar a
  declaração de início de atividade, antes de começar a trabalhar por conta
  própria") → `anticipatedActivityStartDate` (required, `date`).
- **The authentication channel** ("após autenticação com o número de
  identificação fiscal e senha de acesso, ou Cartão do Cidadão ou Chave
  Móvel Digital") → `taxpayerNIF` (required, `classification:
  sensitive-pii`), the sole identifying field modelled — the same design
  decision this registry's own sibling schema
  `pt/at/declaracao-rendimentos-irs-modelo-3` already made for its own
  `taxpayerANIF` field ("The Rosto does not itself print a free-text name
  field for the taxpayer; identification is by NIF alone, matched against
  AT's own records at the authenticated e-filing session"): no separate
  name/address field is modelled, since the leaflet nowhere states the
  declarant re-enters their own name or domicile on this specific
  declaration (already on file with AT from the declarant's own taxpayer
  registration).

## What is NOT modelled (out of scope), and why

- **The resulting IRS regime (Regime de Contabilidade Organizada / Regime
  Simplificado) and IVA regime (Regime Normal / isenção art.º 9.º / Regime
  Especial de Isenção art.º 53.º / R.E.P.R.) classifications themselves** —
  the leaflet is explicit these are *computed outcomes*: "Em função do valor
  anual de rendimentos estimados da categoria B constante da declaração de
  início de atividade, fica enquadrado num dos regimes..." and "Em função
  dos elementos constantes da declaração de início de atividade, fica
  enquadrado num dos regimes IVA." AT determines both automatically from the
  declared elements this schema does model (chiefly `estimatedAnnualTurnover`
  and the declarant's own registered domicile/activity type, the latter not
  itself printed as a separate declared field by this leaflet); they are not
  themselves separate fields the declarant selects on this declaration.
- **The optional election to waive the art.º 9.º CIVA exemption (art.º 12.º
  CIVA), the special flat-rate regime for agricultural producers (art.º
  59.º-A CIVA), and the optional election of Regime de Contabilidade
  Organizada below the mandatory €200,000 threshold** — the leaflet
  documents all three as elections made via a `declaração de alterações`
  (declaration of changes) — a distinct, separate filing from the
  `declaração de início de atividade` this schema models ("A opção pelo
  Regime de Contabilidade Organizada mantém-se válida até que entregue a
  declaração de alterações", and the REPR/art.º 53.º sections' own repeated
  "Entregar a declaração de alterações..." obligations) — nowhere does the
  leaflet attribute any of these three elections specifically to the
  initial início-de-atividade declaration itself. Deliberately left
  unmodelled rather than guessed, to avoid asserting a field placement the
  primary source does not itself state.
- **The declaração de alterações (activity-change) and declaração de
  cessação (activity-cessation) declarations** — the same leaflet documents
  both as separate, distinct filings from the início-de-atividade
  declaration this schema models; out of scope for this v1.0.0.
- **The "ato isolado" (isolated act) cross-reference** — the leaflet notes
  that if the declarant already performed an "ato isolado" earlier the same
  year, that value is excluded from `estimatedAnnualTurnover`'s own
  computation, but is itself drawn from AT's own existing invoicing/billing
  records (e-Fatura), not a fact the declarant enters as a field on *this*
  declaration — excluded as a non-field.
- **The legal-person (pessoa coletiva) equivalent declaration** — the
  selected leaflet is explicitly scoped to "o contribuinte, pessoa singular"
  throughout; a company/legal-person's own equivalent início-de-atividade
  declaration (referenced only in passing by an unrelated search result,
  `www2.gov.pt/inicio/espaco-empresa/balcao-do-empreendedor/pessoa-coletiva-residente-declaracao-de-inicio-de-atividade`,
  not fetched or verified this cycle) is out of scope for this
  natural-person-scoped v1.0.0 and remains an open backlog candidate.
- **The paper/counter-filed alternative** at a Serviço de Finanças — the
  leaflet states this channel exists ("pode ser entregue através do Portal
  das Finanças... ou apresentada... por contabilista certificado" for the
  organized-accounting case) but no current blank paper specimen of it (e.g.
  a "Modelo 1953" reference found only in third-party, non-`.gov.pt` search
  results, not independently confirmed this cycle) was located or verified
  against a primary `.gov.pt`/`.pt`-hosted source; not modelled to avoid
  presenting an unverified form-number claim as fact.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`validation`
constraint in `schema.json` was run against two realistic scenarios plus
four negative controls:

```
[PASS] Scenario A: sole-trader IT consultant, single CAE code, full field set
[PASS] Scenario B: freelance translator, secondary activity code, mixed taxed/exempt operations
[PASS] Negative 1: missing primaryActivityCode
    errors: missing required field: primaryActivityCode
[PASS] Negative 2: missing bankAccountIBAN
    errors: missing required field: bankAccountIBAN
[PASS] Negative 3: estimatedAnnualTurnover below minimum (negative value)
    errors: estimatedAnnualTurnover below minimum 0
[PASS] Negative 4: estimatedAnnualTurnover wrong type
    errors: wrong type for field: estimatedAnnualTurnover (expected number)

All scenarios behaved as expected.
```

Scenario A models a sole-trader IT consultant ("Código de atividade" 62020,
Programação informática) starting activity with one CAE code, no mixed
taxed/exempt operations, and a modest estimated remainder-of-year turnover
(€18,000) — the simplest, single-activity case. Scenario B models a
freelance translator (primary code 74300, plus a secondary code 85592 for
occasional private tutoring) who reports mixed taxed and exempt operations,
exercising both `secondaryActivityCodes` and `hasMixedTaxedAndExemptActivities`
for the first time in this test run. The four negative controls confirm the
check script enforces required top-level fields (`primaryActivityCode`,
`bankAccountIBAN`), the `validation.minimum` constraint on
`estimatedAnnualTurnover`, and its `number` type constraint, rather than
trivially passing everything. No defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate-ajv.mjs registry/pt/at/declaracao-inicio-atividade-pessoas-singulares/1.0.0/schema.json
ok   registry/pt/at/declaracao-inicio-atividade-pessoas-singulares/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/pt/at/declaracao-inicio-atividade-pessoas-singulares/1.0.0`
("1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear") was
re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Portugal's **6th of 6 verticals** (after DMV, Passport, Taxes,
  Visa, and National ID), closing Portugal to full coverage — the second
  non-original jurisdiction in this registry to reach 6/6, after Colombia
  (GOV-1616).
- New authority segment reuse: `pt/at` already exists
  (`pt/at/declaracao-rendimentos-irs-modelo-3`), since AT (Autoridade
  Tributária e Aduaneira) is also the authority for this declaration; this
  is AT's second schema in the registry.
- `jurisdiction.level` is `national`: AT operates nationwide; the specific
  Serviço de Finanças office is not itself a field on this declaration
  (identity/domicile is resolved from the declarant's own existing cadastral
  record at the authenticated session, per the design decision above).
- `process.type` is `registration` (this declaration registers the
  declarant's business/professional activity for IRS/IVA purposes), the same
  convention already used by the closest structural analogue in this
  registry, Spain's `es/aeat/declaracion-censal-alta-actividad-economica-modelo-036`
  (a natural-person "declaración censal simplificada de alta" for a directly
  comparable process).
- `version` set to `1.0.0`: this document models one complete,
  self-contained declaration (the natural-person início-de-atividade
  declaration) in full for its own documented scope; the legal-person
  equivalent and the paper/counter-filed alternative are distinct,
  unverified candidates left for a future cycle, not partial coverage of
  this same document.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-10** (6
months). A future review should prioritize: (a) locating and verifying a
primary `.gov.pt`-hosted specimen of the paper/counter-filed alternative
(the "Modelo 1953" reference surfaced only in third-party search results
this cycle); (b) the legal-person (pessoa coletiva) equivalent declaration;
and (c) re-confirming whether AT's own wizard has, by the next review,
published any further field-by-field documentation (e.g. an updated version
of this cycle's leaflet, or a step-by-step user guide of the live wizard
itself) that could extend this schema's coverage of the election fields
disclosed as out of scope above.
