# Verification record — `pt/at/declaracao-rendimentos-irs-modelo-3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is a `GovSchema Standard Research` cycle (**GOV-1765**). At the start of
this cycle, Portugal stood at 2/6 verticals (DMV via
`pt/imt/requerimento-carta-de-conducao`, GOV-1750; Visa via
`pt/aima/requerimento-autorizacao-residencia`, GOV-1757). The prior
Portugal-opening cycle (GOV-1750) had explicitly flagged AT's Modelo 3 IRS
return as Portugal's strongest remaining Taxes-vertical candidate: "a
genuine, current, rich PDF, but — like Portugal's e-filing-only regime
generally — carries no AcroForm layer, a print/reference facsimile rather
than a fillable form." This cycle confirmed both halves of that claim
directly rather than taking them on faith (see "Sources examined" below),
and authored the schema against it.

## Why this candidate

GOV-1765's brief named this candidate explicitly (Modelo 3 IRS, already
flagged by a prior cycle as the strongest-sourced Taxes candidate for
Portugal), so no further candidate screening across Portugal's other open
verticals (Business Formation, Passport, National ID) was performed this
cycle — consistent with this registry's "when a strong candidate is already
identified and matches the brief, author it rather than re-screening
everything" convention (e.g. GOV-1671, GOV-1685).

## Sources examined

### Source 1 (primary `source`, the Rosto — cover page)

- **Authority:** Autoridade Tributária e Aduaneira (AT), a service of the
  Ministério das Finanças.
- **Document:** Modelo 3, "DECLARAÇÃO DE RENDIMENTOS - IRS", folha de Rosto.
  The document's own printed stamp reads "MODELO EM VIGOR A PARTIR DE
  JANEIRO DE 2025", applicable to income years 2015 and following, filed
  from 01/04/2025.
- **URL (cited in `source.url`):**
  <https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/modelos_formularios/irs/Documents/Mod_3_rosto.pdf>
- **Live-fetch status:** **PASS.** Direct `curl -sI`, HTTP 200, no
  login/CAPTCHA/WAF gate. `Content-Type: application/pdf`,
  `Content-Length: 257370`, `Last-Modified: Mon, 03 Mar 2025 13:25:20 GMT`.
  Re-confirmed with a fresh `curl -sI` immediately before finishing this
  cycle (same 200/257370/`application/pdf`).
- **Byte/structure confirmation:** downloaded directly; the first bytes are
  the literal ASCII `%PDF-1.6` (a genuine PDF, not an HTML error page or
  redirect target). Parsed with `pdfjs-dist` (`legacy/build/pdf.js`):
  **14 pages**; `page.getAnnotations()` returned **zero Widget annotations
  across all 14 pages** (3 non-Widget annotations — internal document links —
  on page 3, no AcroForm fields anywhere) — a flat, print/reference
  facsimile, not a fillable PDF, confirming the prior cycle's (GOV-1750)
  own characterization rather than assuming it.
- **What it confirms:** every Rosto field this document models, verbatim,
  from both the form's own printed boxes (pages 1-2) and its own embedded
  "Instruções de Preenchimento do Rosto" (pages 3-14, printed within the
  same PDF) — a rare case in this registry where the primary source and its
  own corroborating instructions are the same downloaded file, not two
  separately-hosted documents.

### Source 2 (primary `source.documentRef`, Anexo A)

- **Document:** Modelo 3, Anexo A, "RENDIMENTOS DO TRABALHO DEPENDENTE E DE
  PENSÕES". The document's own printed stamp reads "MODELO EM VIGOR A PARTIR
  DE JANEIRO DE 2026".
- **URL:**
  <https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/modelos_formularios/irs/Documents/Mod_3_anexo_A.pdf>
- **Live-fetch status:** **PASS.** Direct `curl -sI`, HTTP 200, no gate.
  `Content-Type: application/pdf`, `Content-Length: 522432`,
  `Last-Modified: Fri, 06 Mar 2026 13:10:06 GMT`. Re-confirmed live
  immediately before finishing this cycle.
- **Byte/structure confirmation:** first bytes `%PDF-1.6`. `pdfjs-dist`
  parse: **13 pages**; **zero Widget annotations across all 13 pages** — same
  flat, non-fillable structure as the Rosto.
- **What it confirms:** every Anexo A field this document models — the
  Quadro 4A income table's código 401 (trabalho dependente) and código 403
  (pensões) columns (NIF da entidade pagadora, Titular, Rendimentos,
  Retenções na fonte, Contribuições, Quotizações sindicais), the full
  income-code table (código 401-419) and the "Terceira coluna"
  titular-identification codes, both from Anexo A's own embedded
  "Instruções de Preenchimento" (pages 3-13); and Quadro 4F.1's current
  "IRS Jovem" (art. 12.º-B do Código do IRS) election text for income years
  2025 and following.

### A genuine same-day edition-date discrepancy, investigated and resolved

The Rosto file's `Last-Modified` (03 Mar 2025) predates Anexo A's
(06 Mar 2026) by exactly one year. Rather than assume this meant the Rosto
was a stale prior-year file being served alongside a freshly updated Anexo
A, this was investigated directly:

- A web search found that **Portaria n.º 104/2026/1, de 5 de março**
  approved new Modelo 3 IRS models and filling instructions for income
  year 2025 (filed 2026), driven by changes from Lei n.º 45-A/2024, de 31
  de dezembro (the 2025 State Budget Law) — chiefly an expanded "IRS Jovem"
  regime, autonomous-taxation changes, and a new productivity/profit-sharing
  bonus exemption. This corroborating fact was found via multiple secondary
  sources (Gescriar, ACIAB, lexpoint.pt, all independently returned by a web
  search) rather than a single one; the primary legal-instrument page itself,
  <https://diariodarepublica.pt/dr/detalhe/portaria/104-2026-1066993467>,
  was also fetched directly and returned HTTP 200, but is a JavaScript
  single-page-application shell with no server-rendered text — its raw HTML
  could not itself be used to confirm content, so it is not relied on as a
  standalone citation here, only as confirmation the URL exists and
  resolves.
- To test whether the Rosto file was actually stale (i.e. missing a
  structural change the Portaria required), both documents' own extracted
  text were searched for the term the Portaria's own summary flagged as
  the headline change: "IRS Jovem". The term **does not appear** in the
  Rosto's extracted text in that sense (the Rosto's own seven "jovem"
  occurrences are all in the unrelated "criança ou jovem acolhido" —
  child/young person in foster care — context, Quadro 6C/7C). The term
  **does appear** repeatedly in Anexo A's extracted text, specifically in
  its Quadro 4F ("IRS JOVEM - anos de 2020 a 2024") and the newly added
  Quadro 4F.1 ("IRS JOVEM — anos de 2025 e seguintes").
- **Conclusion:** this is a structural fact, not staleness. The Portaria's
  2025-and-later "IRS Jovem" expansion is modelled entirely within Anexo A
  (an employment-income annex), and the Rosto's own cover-page structure
  required no corresponding amendment this edition cycle — hence AT's CMS
  genuinely has no reason to have re-touched the Rosto file since March
  2025. Both files are the current, correct ones for a 2026-filed,
  income-year-2025 return.

### A legacy mirror was fetched, found live, and found NOT to be a current
### cross-verification (disclosed rather than silently used)

A secondary host, `www.portaldasfinancas.gov.pt/de/impressos/Mod3.pdf` and
`.../Mod3AnxA.pdf`, was found via web search and fetched directly: both
returned HTTP 200 (`Last-Modified` in Feb 2026, genuine `%PDF` bytes,
different byte-lengths and different MD5 hashes than the info.portaldasfinancas.gov.pt
files). Rather than citing these as a second independently-confirming
mirror of the current form (the mistake this registry's most recent
Portugal cycle, GOV-1757/GOV-1760, made with two URLs that turned out never
to have existed at all), their own extracted text was checked first: both
print "MODELO EM VIGOR A PARTIR DE JANEIRO DE 2009" — a stale, eighteen-year-old
legacy edition AT still serves at that path (presumably retained so
taxpayers filing late/substitute declarations for very old tax years can
still find the applicable historical form), not a live mirror of the
current edition. **These URLs are not cited in `schema.json` or as a
cross-verification anywhere in this document**; they are recorded here only
as an explicit negative finding, per this registry's standing instruction
to disclose every URL actually checked, live or not, rather than silently
omit an inconvenient one.

## Field inventory (Phase 2)

All 28 `fields[]` entries and the 1 `documents[]` entry, and their exact
Rosto/Anexo A location, are listed inline in `schema.json`'s own `sourceRef`
per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Rosto Quadro 1-2 | `taxOfficeCode`, `taxYear` | Full |
| Rosto Quadro 3 | `taxpayerANIF`, `taxpayerADisabilityDegree`, `taxpayerAArmedForcesDisabled` | Core identification only; the sub-70%-disability revision-process campos 02-04 excluded |
| Rosto Quadro 4-5-6 | `maritalStatus`, `jointTaxationElection`, `spouseOrCivilPartnerNIF` | Full for the taxpayer/spouse pairing; household dependents (Quadro 6B), afilhados civis, guarda conjunta (Quadro 6B), and acolhimento familiar (Quadro 6C) entirely out of scope |
| Rosto Quadro 7 | — | Entirely out of scope (ascendentes/colaterais/famílias de acolhimento) |
| Rosto Quadro 8A | `fiscalResidenceRegion` | Residents only; Quadro 8B (non-residents) and 8C (partial fiscal residence) out of scope |
| Rosto Quadro 9 | `refundIBAN`, `associateIBANWithNIF` | Full |
| Rosto Quadro 10 | `declarationNature` | Full |
| Rosto Quadro 11 | `irsConsignmentEntityNIF`, `irsConsignmentEntityType`, `alsoConsignSupportedVAT` | Full |
| Rosto Quadro 12 | `anexoACount` | Only the Anexo A row of the 12-annex table; Anexos B-L out of scope |
| Rosto Quadro 13-14 | — | Entirely out of scope (special-deadline edge cases; agency-reserved box) |
| Anexo A Quadro 4A (código 401) | `employmentIncomePayerNIF`, `employmentIncomeTitular`, `employmentGrossIncome`, `employmentWithholdingTax`, `employmentMandatoryContributions`, `employmentUnionDues` | Full for código 401; códigos 402, 407-419 out of scope |
| Anexo A Quadro 4F.1 | `irsJovemRegimeElection` | The election itself; its several eligibility preconditions not separately validated |
| Anexo A Quadro 4A (código 403) | `pensionIncomePayerNIF`, `pensionIncomeTitular`, `pensionGrossIncome`, `pensionWithholdingTax`, `pensionMandatoryContributions` | Full for código 403; códigos 404-406 (survivor's/alimony/annuity pensions) out of scope |
| Anexo A Quadro 4B-4G, 5, 6 | — | Entirely out of scope (payments on account, other deductions, startup-equity incentives, ex-residents regime, pre-2025 IRS Jovem, dependent-student income exclusion, prior-years' income, startup-share disposal) |

Total: **28 fields** plus **1 `documents[]` entry** (a conditional
supporting-evidence pointer AT may request post-filing). No
`crossFieldValidation` rules or `exclusivityGroups` are modelled — this
schema's scope does not include any pair of fields whose agreement AT's
own instructions describe as enforceable (e.g. it does not model the
arithmetic that would make an income/deduction cross-check meaningful).

## Access notes and judgment calls

1. **The Rosto prints no free-text "name" field for the taxpayer.** Unlike
   `pt/aima/requerimento-autorizacao-residencia`'s Modelo 1 (a
   printed/photocopied, hand-filed form), Modelo 3 is filed exclusively
   through an authenticated Portal das Finanças session; the taxpayer's
   name is looked up server-side from their NIF, not re-typed on the form.
   `taxpayerANIF` is therefore the only taxpayer-identifying field this
   schema models, matching the Rosto's own printed boxes exactly (NIF,
   Incapacidade Grau, F.A.) rather than inventing a `fullName` field the
   source does not have.
2. **`spouseOrCivilPartnerNIF` merges two alternative source locations
   into one field.** The Rosto asks for the spouse/civil-union partner's
   NIF at Quadro 5A campo 01 when joint taxation is elected, or at Quadro 6
   campo 01 (identifying the partner in Quadro 6A) when separate taxation
   applies — two mutually-exclusive printed locations for what is, from an
   applicant's point of view, the same fact (their spouse's NIF). This
   schema models the single resulting value rather than two parallel
   fields, since only one of the two locations is ever filled in for any
   given filer.
3. **`taxpayerADisabilityDegree` excludes the form's own conditional
   sub-fields for a declared degree below 60%** (campos 02-04 of Quadro 3:
   whether the degree resulted from a revision/re-evaluation process, the
   year that process occurred, and the prior degree/year of recognition).
   This is a narrow procedural branch relevant only to a specific
   disability-administrative history, not part of the common salaried-
   employee/pensioner case this schema is scoped around.
4. **`fiscalResidenceRegion` is bounded to Quadro 8A (residents).** Quadro
   8B (non-residents, with its own representative-NIF/country-of-residence/
   EU-EEA-taxation-election sub-fields) and Quadro 8C (partial fiscal
   residence, for a filer who was resident and non-resident in the same
   year) are both out of scope, consistent with this schema's "Portuguese-
   resident salaried employee/pensioner" common-case framing — the same
   kind of resident-only bounding `pl/mf/zeznanie-pit-37` applied to its own
   scope.
5. **`anexoACount` is the only surviving field from Quadro 12's 12-annex
   table.** The Rosto's own Quadro 12 lets a filer declare a quantity for
   each of Anexos A through L plus "Outros documentos"; since this schema
   only models Anexo A, only that row is captured. A filer who actually
   needs Anexo B (business/professional income), F (rental income), G
   (capital gains), J (foreign income), or any of the other eight annexes
   would need a schema this registry does not yet publish — the schema's
   own top-level `description` discloses this explicitly rather than
   silently.
6. **`employmentIncomeTitular`/`pensionIncomeTitular` only model the
   Sujeito Passivo A/B values**, not the further dependent-holder codes
   (D1, D2, AF1, DG1, etc.) Anexo A's own "Terceira coluna" instructions
   define for income belonging to a dependent, afilhado civil, or
   dependente em guarda conjunta — consistent with this schema not
   modelling the Rosto's Quadro 6B/6C dependents tables at all.
7. **`irsJovemRegimeElection` models the election itself, not its
   eligibility.** Anexo A's own Quadro 4F.1 instructions list seven
   cumulative preconditions (age ≤35 at 31 December, not a dependent, ≤10
   prior years of Categoria A/B income, no current or prior
   non-habitual-resident status, no current or prior scientific-research
   tax incentive, no current or prior ex-residents regime, regularized tax
   situation) before a taxpayer may validly answer "Sim." This schema
   captures the yes/no election value as declared; it does not itself
   validate the preconditions, the same treatment `pl/mf/zeznanie-pit-37`
   gave its own `reliefForYoungPeople`/`reliefForReturnees` boolean
   elections rather than re-deriving eligibility logic AT's own systems
   are the authority on.
8. **No `requiredWhen` gate was placed on `irsConsignmentEntityType`
   against `irsConsignmentEntityNIF`.** An earlier draft of this schema did
   write `requiredWhen: { field: "irsConsignmentEntityNIF", notEquals: "" }`,
   intending "required only once the taxpayer actually named a
   consignment beneficiary." This is a known bug class in this registry
   (documented in this project's own working notes on a prior cycle): under
   a literal leaf-compare evaluator, an *absent* optional field is
   `undefined`, and `undefined !== ""` evaluates `true` — so the condition
   would have misfired as "always required" for every filer, not just
   those who filled in the NIF. There is no safe leaf-compare condition in
   the GSP-0013 `Condition` grammar for "field is present" against an
   absent (not merely empty-string) optional field. The `requiredWhen` was
   removed before this schema was finalized; the relationship between the
   two fields is instead described in `irsConsignmentEntityType`'s own
   `description`.
9. **No AcroForm-based field types, patterns, or `maxLength`s are asserted
   for NIF fields** (`taxpayerANIF`, `spouseOrCivilPartnerNIF`,
   `employmentIncomePayerNIF`, `pensionIncomePayerNIF`,
   `irsConsignmentEntityNIF`) beyond `type: "string"`, consistent with this
   registry's existing Portuguese-jurisdiction precedent
   (`pt/imt/requerimento-carta-de-conducao`'s own `taxIdentificationNumber`
   field carries no digit-count pattern either) rather than asserting an
   unverified 9-digit constraint neither source PDF's own text states
   explicitly.
10. **No `documents[].signatureDeclaration`/attestation is modelled.**
    Unlike `pl/mf/zeznanie-pit-37` (a printable, hand-signable paper form)
    or `pt/aima/requerimento-autorizacao-residencia` (a photocopy-and-mail
    form with its own printed DECLARAÇÃO/signature block), Modelo 3 is
    "obrigatoriamente entregue por transmissão eletrónica de dados"
    (mandatorily filed by electronic data transmission) through an
    authenticated portal session — the PDF itself carries no signature
    block to model. The one `documents[]` entry this schema does carry
    (`householdCompositionSupportingEvidence`) reflects AT's own disclosed
    post-filing evidence-request power, not a filing-time attachment.

## Test run (Phase 3)

No live submission was attempted: Modelo 3 is filed exclusively through an
authenticated Portal das Finanças session (personal password/Chave Móvel
Digital), and submitting fabricated taxpayer data against Portugal's live
tax administration is not a safe or reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory (a mainland-resident single salaried
employee, first declaration of the year, one employer, no pension income,
no IRS Jovem election, no IRS/IVA consignment) and checked against
`schema.json`'s own `fields[]` (`type`/`validation`/`required`) compiled
into a JSON Schema draft 2020-12 document, validated with `ajv`, plus a
small hand-rolled evaluator for this document's two `requiredWhen`
conditions (both `field`/`in` leaves: `jointTaxationElection` and
`spouseOrCivilPartnerNIF`, both gated on `maritalStatus`):

```
$ node validate_instance.mjs registry/pt/at/declaracao-rendimentos-irs-modelo-3/1.0.0/schema.json mock_modelo3.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS

OVERALL: PASS
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # taxOfficeCode removed — violates required: true
Static (required/type/pattern/enum) validation: FAIL
 - must have required property 'taxOfficeCode'

$ # maritalStatus set to "married", jointTaxationElection and
$ # spouseOrCivilPartnerNIF both omitted — violates requiredWhen
requiredWhen violation: jointTaxationElection is required when maritalStatus in [married, civil_union]
requiredWhen violation: spouseOrCivilPartnerNIF is required when maritalStatus in [married, civil_union]
requiredWhen conditional validation: FAIL

$ # maritalStatus set to "married", jointTaxationElection "no",
$ # spouseOrCivilPartnerNIF supplied
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS

$ # taxYear set to 2010 — violates the 2015-2100 minimum/maximum range
Static (required/type/pattern/enum) validation: FAIL
 - must be >= 2015
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pt/at/declaracao-rendimentos-irs-modelo-3/1.0.0/schema.json
ok   registry/pt/at/declaracao-rendimentos-irs-modelo-3/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pt/at/declaracao-rendimentos-irs-modelo-3/1.0.0/schema.json
ok   registry/pt/at/declaracao-rendimentos-irs-modelo-3/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## Cross-References

- **Prior cycle:** [GOV-1750](/GOV/issues/GOV-1750) — Portugal DMV opening,
  explicitly flagged Modelo 3 IRS as Portugal's strongest-sourced remaining
  Taxes candidate.
- **Portugal's 1st vertical:** `pt/imt/requerimento-carta-de-conducao`
  (DMV, GOV-1750).
- **Portugal's 2nd vertical:** `pt/aima/requerimento-autorizacao-residencia`
  (Visa/residence status, GOV-1757, review-gated GOV-1760).
- **Closest scope precedent:** `pl/mf/zeznanie-pit-37` (Poland's PIT-37,
  GOV-1691) — a national annual personal income tax return for the
  employee/pensioner common case, no AcroForm layer, self-documenting
  primary source, same bounded-scope methodology.
- **Portugal by vertical:** now **3/6** (DMV, Visa, Taxes); Business
  Formation, Passport, and National ID remain open backlog candidates.
- **Global Taxes vertical:** unaffected at the global-100%-jurisdiction
  level (already closed), this is a new jurisdiction gaining its first
  Taxes-vertical schema.

---

**Verified by:** Standards Engineer, via GOV-1765 research cycle
**Verified at:** 2026-07-08
**Next Review:** 2027-01-08 (annual; sooner if a new Portaria supersedes the
current Modelo 3 edition before then)
