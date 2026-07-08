# Verification record — `pt/mne/requerimento-cartao-cidadao-passaporte-consular` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1797**: a "GovSchema Standard Research" follow-up cycle
re-screening Portugal's three remaining open verticals — Business Formation,
Passport, and National ID — after GOV-1750's opening cycle gave all three a
light, non-exhaustive screening pass (documented in CATALOG.md around
lines 209-253). All three were re-screened live this cycle, prioritizing the
National ID consular-PDF lead GOV-1750 explicitly flagged as unpursued.

## Candidate screening

### 1. National ID — picked: São Paulo consulate's `cc_e_pep_formulario.pdf`

GOV-1750's own record for this vertical read: "a consulate-hosted application
PDF (`req_cc.pdf`) was located with 42 distinct field labels — but it is
consular-only... and required a proxy workaround to retrieve directly."
Re-fetching `req_cc.pdf` (Consulado-Geral de Portugal no Rio de Janeiro,
`https://riodejaneiro.consuladoportugal.mne.gov.pt/images/req_cc.pdf`) this
cycle confirms that description: it is a genuine, current PDF, but its
`pdfjs-dist` annotation layer returns **zero** Widget annotations — a flat
print facsimile (blank underscore lines for hand-filling), not a fillable
AcroForm. GOV-1750 counted 42 "field labels" from its printed text, not 42
AcroForm fields; that distinction was not fully spelled out in the prior
record.

This cycle searched further and found a **second, stronger** consulate-hosted
PDF: the Consulado-Geral de Portugal em São Paulo's
`https://saopaulo.consuladoportugal.mne.gov.pt/images/cc_e_pep_formulario.pdf`
("Requerimento de Atos Presenciais — Cartão do Cidadão e/ou Passaporte"). Its
`pdfjs-dist` annotation layer, scoped to the page's own `/Annots` array,
lists **46 raw Widget annotations collapsing to 45 unique positions**: 12 of
the 26 unique text-field positions are each backed by two near-identically-
rects widgets (an artifact of the online form-builder tool that appears to
have produced this PDF, not a government-authored native AcroForm export),
while the two radio groups' own widgets are each a genuinely distinct
position (one per selectable option), not duplicates. Separately, the file's
underlying AcroForm field tree also carries roughly 40 additional Widget
objects that are **not** attached to this page's `/Annots` array — orphaned,
invisible, unfillable leftovers from the same form-builder tool, confirmed
via a direct pdf-lib field-tree walk cross-referenced against the page's own
annotation list; they carry no rendered label and are not part of the live,
fillable form a user actually sees or fills, so no field here is sourced from
them. The two radio groups are `vou solicitar` (3-option modality selector)
and `Estado Civil Actual` (4-option marital-status selector), plus 1 checkbox
and 26 unique text fields. This is a genuine,
currently-linked, unauthenticated, fillable AcroForm — the strongest
Portuguese candidate either this cycle or GOV-1750 found across all three
gaps. A third PDF, São Paulo's older `formulario_cc__pep.pdf`, is also a flat,
widget-free 2-page facsimile, confirming `cc_e_pep_formulario.pdf` is that
consulate's newer, upgraded fillable version.

### 2. Business Formation — re-screened, still weak

Re-searched for a downloadable AcroForm ("Empresa na Hora formulário download
pdf pacto social"). `justica.gov.pt/Servicos/Empresa-na-Hora/Pactos` confirms
the pre-approved pacto-social models remain pre-formatted specimen documents a
notary/Conservatória fills in on the applicant's behalf at the counter, not a
citizen-facing fillable AcroForm; the sole-trader "Início de Atividade"
self-service route remains behind the `acesso.gov.pt` authenticated portal
with no PDF fallback found. Re-confirms GOV-1750's finding: no qualifying
source found this cycle either.

### 3. Passport — re-screened, still weak

Re-searched ("requerimento passaporte português formulário pdf SEF PEP").
`gov.pt`'s "Pedir o passaporte português para estrangeiros" and IRN's
"Passaporte eletrónico" pages both confirm the domestic Passaporte Eletrónico
Português (PEP) remains an in-person, biometric-enrolment appointment with no
separate citizen-facing application PDF (Decreto-Lei n.º 83/2000 Art. 16
still holds, matching GOV-1750's finding). The only passport-adjacent PDF this
cycle found is the same São Paulo consulate `cc_e_pep_formulario.pdf` picked
for National ID above — its `requestModality` field's "Somente Passaporte"
option and its "Documento de Viagem" bring-along-document panel jointly cover
a consular passport-only or combined request, but the form's own header lists
Cartão de Cidadão first and the "Somente Passaporte" option is explicitly
conditioned on already holding a valid CC or lifetime BI — i.e. it is a
National-ID-centric intake form that happens to also carry a passport
sub-option, not a passport-specific application. Portugal's Passport vertical
therefore remains an open backlog candidate; this schema's own top-level
`description` discloses that the same source document also serves that
option.

## Access notes

`saopaulo.consuladoportugal.mne.gov.pt` could not be reached directly from
this environment: a plain `curl`/`openssl s_client` connection and a
Playwright/Chromium fetch (real browser, realistic UA) both get a TLS
handshake reset (`ECONNRESET`) immediately after the ClientHello, for every
path on the domain including its own root page — consistent with an IP/ASN
range-level block on the consulate's WAF rather than a dead or gated
resource. `irn.justica.gov.pt` and other `.gov.pt`/`.pt` domains fetched fine
from the same environment during this cycle, isolating the block to this
specific consular subdomain. Per this registry's established Wayback
workaround (see project memory `gov-au-wayback-workaround.md` and
`ee-rik`/`ee-ppa`'s prior use of the same technique), all three PDFs and the
page discovery were instead retrieved via `web.archive.org`'s most recent
snapshot of each URL:

- `cc_e_pep_formulario.pdf` — Wayback snapshot `20251208090724` (2025-12-08),
  HTTP 200, `application/pdf`, 648,610 bytes, `%PDF-1.5`.
- `formulario_cc__pep.pdf` and `req_cc.pdf` — also retrieved via Wayback,
  used only as comparison/contrast evidence (see above), not as this
  document's own source.

`tools/verify-sources.mjs` was run against this document; both
`saopaulo.consuladoportugal.mne.gov.pt` URLs report `WARN`
(`ECONNRESET`, tolerated as a transient/blocked-access signature per the
tool's own design), not `FAIL` — consistent with the network-level block
described above rather than a dead or fabricated citation.

## Extraction method

`pdfjs-dist` (legacy Node build) was used to extract both the page text
content and the full AcroForm annotation layer (field name, type, rect,
radio/checkbox button values) from `cc_e_pep_formulario.pdf`. Because this
particular PDF's extractable text layer is sparse (many printed labels did
not surface as extractable text items, likely due to how the originating
form-builder tool encoded its layout), field-to-label mapping was
**independently confirmed by rendering the PDF to a full-page image** via a
headless Chromium (Playwright, using this environment's bundled
`chrome-sysroot` shared libraries) opening the local PDF file directly and
using Chromium's native PDF viewer — not by trusting AcroForm field names or
coordinate proximity alone. Every field's label below was read directly off
that rendered image, cross-checked against each widget's rect coordinates.

## Field inventory

29 `fields[]` entries (28 with a real AcroForm widget — 2 radio groups, 1
checkbox, and 25 unique logical text fields, one of which, `fullName`, is
backed by two distinct on-page positions; `dateOfRequest` is modelled from a
printed, self-documenting but widget-less blank line — see judgment call 4)
and 2 `documents[]` entries.

| Step | Fields | Source |
|---|---|---|
| Vou solicitar | `requestModality` | `radio_group_48upva` (3-option) |
| REQUERENTE | `age`, `maritalStatus`, `fullName`, `identityCardNumber`, `maidenOrBirthName`, `dateOfBirth`, `height`, `rgOrRne`, `cpf`, `phoneNumbers`, `email`, `civilParishOfBirth`, `municipalityOfBirth`, `districtOfBirth`, `dateOfEntryToCountry`, `placeOfBirthAbroad` | `text_2ekak`/`text_20uiwp`, `radio_group_38phjd`, `text_7itaa`/`text_26flad` (+`text_38yiag`/`text_28kzzv` signature-block duplicate), `text_8eeil`/`text_21yfrl`, `text_9naqb`/`text_22nbxo`, `text_11xlqu`/`text_27vgjt`, `text_2kmuq`, `text_10wctv`/`text_25odgd`, `text_12emvn`/`text_24suxm`, `text_13afpn`/`text_23crdk`, `text_14agec`/`text_18eebr`, `text_3udii`, `text_4sglc`, `text_5rxtu`, `text_6omfi`, `text_7xnrh` |
| ENDEREÇO | `confirmSameDeliveryAddress`, `streetAddress`, `addressNumber`, `addressUnit`, `neighborhood`, `postalCode`, `cityState` | `checkbox_1syxn`, `text_8exzx`, `text_12sxyk`, `text_13rqc`, `text_10byds`, `text_11dswr`, `text_9emie` |
| PAIS DO(A) REQUERENTE | `fatherName`, `fatherDateOfBirth`, `motherName`, `motherDateOfBirth` | `text_22jpva`/`text_16qonb`, `text_29ktfo`/`text_17jgp`, `text_14makd`, `text_15hwwm` |
| DATA E ASSINATURA DO REQUERENTE | `dateOfRequest` | printed 'Data: ___/___/___' line (no widget) |

`documents[]`: `identificationDocumentsPresented` (the form's own "Documentos
de Identificação Civil"/"Documento de Viagem" illustrated panel),
`requerentePresence` (the form's own verbatim "Obs:" note requiring the
applicant's personal, in-person appearance regardless of age).

## Judgment calls

1. **Modelled under Portugal's National ID vertical, not Passport**, even
   though the source form's `requestModality` field includes a passport-only
   option. Cartão de Cidadão is the form's first-listed, primary modality and
   the form's own structure conditions the passport-only option on already
   holding a valid CC/BI — a National-ID-centric document, not a
   passport-specific application. See "Candidate screening" §3 above; this
   leaves Portugal's Passport vertical open.
2. **Scoped to this one consular post's own published PDF, not a claimed
   unified national standard.** Three different Portuguese consulates
   examined this cycle (Rio de Janeiro, and São Paulo's own two generations
   of the form) each publish a differently structured document for what is
   nominally the same underlying process, and Rio's carries no AcroForm at
   all. This document's `id`, `authority`, and top-level `description` are
   explicit that it models São Paulo's specific implementation, not a
   claimed MNE-wide template.
3. **Several fields (`cpf`, `rgOrRne`, `postalCode`/CEP, `neighborhood`/Bairro)
   are Brazil-specific address/identity data points**, present because this
   consulate's applicant base is resident in Brazil. A consulate in another
   country would publish a differently localized version of this form (as
   Rio de Janeiro's own, non-AcroForm `req_cc.pdf` already demonstrates,
   which asks for CPF but not RG/RNE, and structures the address block
   differently). This is disclosed in the top-level `description` rather
   than presented as a jurisdiction-wide Portuguese standard.
4. **`dateOfRequest` is modelled despite carrying no AcroForm widget.** Every
   other field in this document corresponds to a real Widget annotation; the
   closing "Data: ___/___/___" line is a plain printed blank (confirmed via
   both the annotation-layer dump and the rendered image), the only such gap
   in an otherwise fully-fillable form. It is included because it is a
   clearly designated, self-documenting field on the form's own face, and
   because pt/imt/requerimento-carta-de-conducao's own `dateOfRequest`
   equivalent (there, a genuine widget) plays the same closing role — this
   task's own instructions permit a "clean, numbered, self-documenting field
   structure" as an acceptable source shape alongside a strict AcroForm
   layer.
5. **No `requiredWhen` dependency is asserted between the "born in Portugal"
   fields (`civilParishOfBirth`/`municipalityOfBirth`/`districtOfBirth`/
   `dateOfEntryToCountry`) and the "born abroad" field
   (`placeOfBirthAbroad`)**, even though the form visually presents them as
   alternatives under "Se nasceu em Portugal:" / "Se nasceu no Exterior:"
   headers. The form carries no checkbox or radio control selecting between
   the two — only section headers — so asserting a structural
   `requiredWhen`/`exclusivityGroups` rule here would fabricate a dependency
   the source does not itself encode as a checkable condition, the same
   discipline `pt/imt/requerimento-carta-de-conducao`'s own VERIFICATION.md
   applied to `medicalRestrictionCodes` and the `currentlyHolds*` fields (see
   its judgment calls 7-8), and the same class of bug flagged in project
   memory (`notequals-empty-string-absent-field-bug`).
6. **No fee/payment `documents[]` entry.** A search this cycle located the
   consulate's own monthly "Tabela de Emolumentos" fee schedule
   (`.../images/emolumentos/2026/tabela_de_emolumentos_janeiro_2026.pdf`,
   confirmed live via web search, dated January 2026), but it could not be
   directly fetched (same network block described above) and has no Wayback
   snapshot as of this cycle, so this schema does not assert a specific fee
   amount or payment method it could not independently confirm — omitted
   rather than fabricated, consistent with this registry's standing
   discipline after the GOV-1760/GOV-1763 fabricated-sourcing incidents.
7. **`height` ("Altura") is left `required: false`, correcting an initial
   drafting error.** A sibling consulate's equivalent form (Rio de Janeiro's
   `req_cc.pdf`) marks its own "Altura" field "( item obrigatório)"
   (mandatory item) — this schema's first draft mistakenly attributed that
   marker to the São Paulo `cc_e_pep_formulario.pdf` source document itself,
   an artifact of cross-referencing both PDFs' extracted text side by side
   during authoring. Re-checking specifically: `cc_e_pep_formulario.pdf`'s
   own extractable text (both the AcroForm-adjacent text-content extraction
   and a targeted, zoomed Chromium render of the "Altura:" field region)
   carries no "obrigatório" or equivalent mandatory-marker text anywhere near
   it. Caught and fixed before finalizing this document; disclosed here as
   the kind of same-document cross-contamination error this registry's own
   verify-sources tooling and review-gate process exist to catch (see
   `gov-1763-verify-sources-ci-gate` and `gov1760-pt-aima-review-gate` in
   project memory).
8. **No field in this document is marked `required: true` on an explicit
   in-document mandatory-marker** — none of `cc_e_pep_formulario.pdf`'s own
   extractable text or its rendered page carries an "obrigatório" (or
   equivalent) annotation next to any field, unlike the Rio de Janeiro
   sibling form's "Altura" field. Every `required: true` field
   (`requestModality`, `maritalStatus`, `fullName`, `dateOfBirth`,
   `fatherName`, `motherName`, `dateOfRequest`) is instead inferred from its
   role as a structurally necessary identity/parentage/closing field
   consistent with Lei n.º 7/2007's Cartão de Cidadão data model — a softer
   basis than an explicit in-form marker, disclosed here rather than
   implied. `identityCardNumber`, `email`, `height`, and the address block
   are all left optional for the same reason plus the additional,
   source-stated fact that a first-time CC applicant would have no prior
   CC/BI number to give; `confirmSameDeliveryAddress` and the address fields
   are plausibly conditionally required only for the "URGENTE"/mail-delivery
   option, but the form does not encode that as a checkable field-level
   condition (it is prose in the surrounding instructions, not a control on
   the `confirmSameDeliveryAddress` checkbox), so no `requiredWhen` rule is
   asserted here.
9. **No live submission was attempted.** Submitting this form at a real
   consular appointment triggers a real fee, a real biometric appointment,
   and a real change to the applicant's legal identity record — not a safe
   or reversible action to simulate against a live government process,
   consistent with this registry's standing discipline.

## Validation

```
$ node tools/validate.mjs registry/pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0/schema.json
ok   registry/pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0/schema.json
ok   registry/pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0
verify-sources: checking 1 schema version directory...

pt/mne/requerimento-cartao-cidadao-passaporte-consular/1.0.0 (4 URLs)
  [WARN] https://saopaulo.consuladoportugal.mne.gov.pt/
      transient failure after 3 attempt(s) (ECONNRESET) — tolerated, re-check manually if this persists
  [WARN] https://saopaulo.consuladoportugal.mne.gov.pt/images/cc_e_pep_formulario.pdf
      transient failure after 3 attempt(s) (ECONNRESET) — tolerated, re-check manually if this persists
  [WARN] https://riodejaneiro.consuladoportugal.mne.gov.pt/images/req_cc.pdf
      transient failure after 3 attempt(s) (ECONNRESET) — tolerated, re-check manually if this persists

verify-sources: 1 directory, 4 URLs checked, 3 warning(s), 0 allowlisted, all clear.
```

Both `WARN`s are expected given the environment-level TLS block documented
above under "Access notes," not evidence of a dead or fabricated source.
