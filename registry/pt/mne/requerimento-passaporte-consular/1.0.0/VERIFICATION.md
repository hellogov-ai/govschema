# Verification record — `pt/mne/requerimento-passaporte-consular` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1833**: a "GovSchema Standard Research" cycle pursuing the one
lead `pt/mne/requerimento-cartao-cidadao-passaporte-consular`'s own
VERIFICATION.md (GOV-1797) explicitly flagged as unexplored: "a genuinely
distinct domestic or consular passport-specific form remains an open,
unscreened backlog candidate for a future cycle." GOV-1797 had examined Rio
de Janeiro's `req_cc.pdf` only as a *comparison point* against São Paulo's
Cartão de Cidadão-centric AcroForm, and concluded the São Paulo form's own
conditional "Somente Passaporte" option was the closest passport-adjacent
source found — explicitly not a passport-specific application. This cycle
searched further at the Rio de Janeiro consulate specifically and found a
second, separate document at the same domain.

## Candidate screening

### Passport — picked: Rio de Janeiro consulate's `req_psspnovo.pdf`

Searched `riodejaneiro.consuladoportugal.mne.gov.pt` beyond the `req_cc.pdf`
GOV-1797 had already examined, and found `images/req_psspnovo.pdf`
("Requerimento de Passaporte") — a distinct, passport-specific intake form
at the same consular post, not a variant or later version of `req_cc.pdf`.
Unlike `req_cc.pdf` (Cartão de Cidadão-centric, referenced only in GOV-1797's
comparison notes) and unlike São Paulo's `cc_e_pep_formulario.pdf` (also
Cartão de Cidadão-primary, with a passport option conditioned on already
holding a valid CC/BI), this form's own title, opening fields, and every
downstream section (issuance-speed choice, document-delivery-by-mail
option) are passport-specific throughout; the CC/BI number field that does
appear is explicitly marked "(caso possua)" (if you have one) and used only
as an optional cross-reference identity number, not the form's primary
subject.

Re-confirmed while re-screening this cycle: Portugal's domestic passport
route (`gov.pt`'s "Pedir ou renovar o passaporte eletrónico português") still
describes only an in-person, appointment-based, biometric-enrolment process
via IRN with no downloadable citizen-facing form, consistent with every
prior cycle's finding (Decreto-Lei n.º 83/2000 Art. 16). No other Portuguese
consulate's site was found to publish a further, third passport-specific
form distinct from this one and from São Paulo's CC-centric form.

## Access notes

`riodejaneiro.consuladoportugal.mne.gov.pt` could not be reached directly
from this environment: both `curl` and Node's native `https` client get a
TLS handshake failure (`SSL routines::unexpected eof while reading` /
`ECONNRESET`) immediately after the ClientHello, for every path on the
domain — the same network-level block this registry's `gov1797` cycle
recorded for the sibling `saopaulo.consuladoportugal.mne.gov.pt` subdomain.
Per this registry's established Wayback workaround (project memory
`gov-au-wayback-workaround.md`), the document was instead retrieved via
`web.archive.org`'s snapshot:

- `req_psspnovo.pdf` — Wayback snapshot `20240713201256` (2024-07-13), HTTP
  200, `application/pdf`, 100,261 bytes, `%PDF-1.5`.

`tools/verify-sources.mjs` was run against this document; both
`riodejaneiro.consuladoportugal.mne.gov.pt` URLs report `WARN`
(`ECONNRESET`, tolerated as a transient/blocked-access signature per the
tool's own design), not `FAIL` — consistent with the network-level block
described above rather than a dead or fabricated citation.

## Extraction method

`pdfjs-dist` (legacy Node build) was used to extract the page's text content
with per-item `(x, y)` transform coordinates, then grouped into printed
lines by `y`-coordinate and sorted left-to-right by `x` within each line, to
reconstruct the form's exact field order and grouping without relying on
raw extraction order. Separately, `page.getAnnotations()` was called and
returned **0 annotations** — this PDF carries no AcroForm or XFA layer at
all (confirmed independently: the raw file bytes contain no `/AcroForm` or
`/XFA` token anywhere), unlike either `cc_e_pep_formulario.pdf` (a genuine
45-widget AcroForm) or `req_cc.pdf` (also widget-free, per GOV-1797's own
finding) at the sibling consulates. This document's entire field set is
therefore modelled from its self-documenting, cleanly legible printed text
layer alone — every field here is the same class of source GOV-1797's own
`dateOfRequest` field used for its one widget-less line, applied to an
entire one-page form rather than a single field.

## Field inventory

25 `fields[]` entries (0 with a real AcroForm widget — the source form has
no fillable layer at all) and 1 `documents[]` entry, reconstructed from the
extracted text lines below (`y`-coordinate, top to bottom):

| Printed line (y-coord) | Field(s) modelled |
|---|---|
| `Nome completo:` (647) | `fullName` |
| `Nº do Cartão de Cidadão ou Bilhete de identidade (caso possua) :` (633) | `identityCardNumber` |
| `Data de Validade` (620) | `identityCardValidityDate` |
| `Possui Passaporte (Português) Válido ? Não Sim (...)` (592/582) | `hasValidPortuguesePassport` |
| `Data de Nascimento: CPF:` (561) | `dateOfBirth`, `cpf` |
| `Nome do pai:` (547) | `fatherName` |
| `Nome da mãe:` (533) | `motherName` |
| `Local de nascimento :` / `Nascidos em Portugal:` / `Freguesia :` (506/492/478) | `civilParishOfBirth` |
| `Concelho :` (464) | `municipalityOfBirth` |
| `Nascidos no Brasil ou outro país :` / `Cidade/Estado:` (437/423) | `birthCityState` |
| `País :` (409) | `birthCountry` |
| `Endereço de residência:` (381) | `residentialAddress` |
| `Bairro:` (368) | `residentialNeighborhood` |
| `CEP: Cidade/Estado:` (354) | `residentialPostalCode`, `residentialCityState` |
| `Nº Celular : ( ) Nº Tel. Fixo ( )` (340) | `mobilePhone`, `landlinePhone` |
| `e-mail` (326) | `email` |
| `Modo de emissão: Urgente (7 dias uteis) Sem urgência (14 dias )` (299) | `issuanceMode` |
| `Endereço para a entrega do documento (caso não seja o mesmo da residência):` (243) | `deliveryAddressDifferentFromResidence` |
| `Bairro:` (216) | `deliveryNeighborhood` |
| `CEP: Cidade/Estado:` (202) | `deliveryPostalCode`, `deliveryCityState` |
| `Data:` (166) | `dateOfRequest` |

`documents[]`: `previousValidPassport`, sourced from the form's own
"caso sim, apresentar o passaporte válido no dia do atendimento" (if yes,
present the valid passport on the day of the appointment) instruction,
modelled with `requiredWhen` gated on `hasValidPortuguesePassport` equalling
`true`.

## Judgment calls

1. **Closes Portugal's Passport vertical**, distinct from the National ID
   vertical `pt/mne/requerimento-cartao-cidadao-passaporte-consular` already
   occupies. This form's own title ("Requerimento de Passaporte") and every
   section are passport-specific; the one CC/BI field present is an
   optional cross-reference, not the form's primary subject — the inverse
   structure of the São Paulo sibling, where Cartão de Cidadão is primary
   and passport is the conditional option. This satisfies the distinction
   GOV-1797's own judgment call 1 drew when declining to double-count the
   São Paulo form under both verticals.
2. **No `requiredWhen` dependency is asserted between the "born in
   Portugal" fields (`civilParishOfBirth`/`municipalityOfBirth`) and the
   "born in Brazil or another country" fields (`birthCityState`/
   `birthCountry`)**, for the same reason as the São Paulo sibling schema's
   judgment call 5: the form carries section headers, not a checkbox or
   radio control selecting between the two, so asserting a structural rule
   here would fabricate a dependency the source does not itself encode as a
   checkable condition (see project memory
   `notequals-empty-string-absent-field-bug`).
3. **No field is marked `required: true` on an explicit in-document
   mandatory-marker** — this form's extractable text carries no
   "obrigatório" (or equivalent) annotation anywhere. Every `required: true`
   field (`fullName`, `hasValidPortuguesePassport`, `dateOfBirth`,
   `fatherName`, `motherName`, `issuanceMode`, `dateOfRequest`) is instead
   inferred from its role as a structurally necessary identity/parentage/
   gating/closing field, the same softer basis disclosed in the São Paulo
   sibling schema's judgment call 8. `identityCardNumber`, `cpf`, `email`,
   and both address blocks are left optional for the same reason, plus the
   source's own "(caso possua)" (if you have one) qualifier on the identity
   card field.
4. **`dateOfRequest` is modelled despite carrying no AcroForm widget** —
   consistent with the São Paulo sibling schema's own judgment call 4, except
   here it applies to the entire form rather than one closing line, since
   this document has no fillable layer at all. Included because it is a
   clearly designated, self-documenting field on the form's own face.
5. **No fee/payment `documents[]` entry.** No fee schedule or payment
   instruction is printed anywhere on this one-page form (unlike the São
   Paulo sibling, whose separate fee-schedule PDF at least surfaced in a web
   search even though it could not be fetched). Omitted rather than
   fabricated, consistent with this registry's standing discipline after the
   GOV-1760/GOV-1763 fabricated-sourcing incidents.
6. **No live submission was attempted.** Submitting this form at a real
   consular appointment triggers a real fee, a real biometric appointment,
   and a real change to the applicant's legal travel document — not a safe
   or reversible action to simulate against a live government process,
   consistent with this registry's standing discipline.

## Validation

```
$ node tools/validate.mjs registry/pt/mne/requerimento-passaporte-consular/1.0.0/schema.json
ok   registry/pt/mne/requerimento-passaporte-consular/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pt/mne/requerimento-passaporte-consular/1.0.0/schema.json
ok   registry/pt/mne/requerimento-passaporte-consular/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/pt/mne/requerimento-passaporte-consular/1.0.0
verify-sources: checking 1 schema version directory...

pt/mne/requerimento-passaporte-consular/1.0.0 (3 URLs)
  [WARN] https://riodejaneiro.consuladoportugal.mne.gov.pt/
      transient failure after 3 attempt(s) (ECONNRESET) — tolerated, re-check manually if this persists
  [WARN] https://riodejaneiro.consuladoportugal.mne.gov.pt/images/req_psspnovo.pdf
      transient failure after 3 attempt(s) (ECONNRESET) — tolerated, re-check manually if this persists

verify-sources: 1 directory, 3 URLs checked, 2 warning(s), 0 allowlisted, all clear.
```

Both `WARN`s are expected given the environment-level TLS block documented
above under "Access notes," not evidence of a dead or fabricated source.
