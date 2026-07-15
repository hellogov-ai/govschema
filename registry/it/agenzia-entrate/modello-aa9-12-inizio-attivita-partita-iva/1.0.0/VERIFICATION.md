# Verification record — `it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is a `GovSchema Standard Research` cycle (**GOV-3045**). Italy stood at
4 of 6 verticals (DMV, Taxes, Visa, Passport) before this update, via the
concurrently-landed GOV-3031/GOV-3032 Passport/Visa openings. This document
opens **Business Formation**, reaching **5 of 6**.

## This overturns a prior "dead end" finding

This registry's own `it/agenzia-entrate/modello-730` VERIFICATION.md (GOV-2382)
recorded Italy's Business Formation vertical as a dead end, having examined
only the centralized Registro Imprese ComUnica telematic-filing system
(digital-signature/intermediary-only — correctly still a dead end for a plain
downloadable form). That prior screening did not consider the Agenzia delle
Entrate's own, separate AA9/12 VAT-registration declaration — the document a
person actually starting an individual business/self-employed activity files
to obtain a Partita IVA (VAT number), independent of whether they are also
obliged to register with the Registro Imprese. This is the same agency and
source tier already established in this registry via `modello-730`, and it is
a genuine, directly-downloadable, unauthenticated PDF.

## Sources examined and fetched fresh

### Source 1 (primary `source`, the form)

- **Authority:** Agenzia delle Entrate (AdE).
- **Document:** Modello AA9/12, "Dichiarazione di inizio attività, variazione
  dati o cessazione attività ai fini IVA (imprese individuali e lavoratori
  autonomi)".
- **URL:**
  `https://www.agenziaentrate.gov.it/portale/documents/20143/6020466/Modello+aa9_AA9_12+modello.pdf/b160f029-bd20-984e-334d-5f7602c2ae59?t=1749731883657`;
  landing page:
  `https://www.agenziaentrate.gov.it/portale/web/guest/schede/istanze/dichiarazione-iva/dichiarazione-di-inizio-variazione-e-cessazione-attivita-aa912`.
- **Fetched:** direct `curl` from this sandbox, 2026-07-15. **HTTP 200**, no
  login/CAPTCHA/WAF gate.
- **Size:** 80,112 bytes — matches the scouting subagent's own reported size
  exactly.
- **sha256:** `a75a7ddab209b5355dc0ab40f78e6ba27d43806140ab60de1f9c8857dc32c599`
  — matches the scouting subagent's own reported hash exactly.
- **Pages:** 5 (confirmed via `pdfjs-dist`'s own `doc.numPages`).
- **Extraction method:** `pdfjs-dist` (`legacy/build/pdf.js`, CommonJS entry
  point — this sandbox's copy ships no `legacy/build/pdf.mjs`, unlike some
  prior cycles' installs). `page.getAnnotations()` returned **zero** Widget
  annotations across all 5 pages — a static print/hand-fill template (an
  `/AcroForm` dictionary exists in the Catalog but its `/Fields` array is
  empty), the same source tier already accepted for this registry's own
  `modello-730`, `pl/mf/zeznanie-pit-37`, and
  `es/aeat/declaracion-censal-personas-fisicas-modelo-030`. Text extracted via
  `page.getTextContent()` with each item's `transform` y-coordinate used to
  group text into rows (rounded to whole units) sorted by x — the form's
  Quadro/riquadro structure is single-column enough that this recovered fully
  legible reading order on every page without further reconstruction.
- **What it confirms:** every Quadro/riquadro label this schema's `fields[]`/
  `documents[]` cite, in place: Quadro A's four declaration-type checkboxes,
  Quadro B's soggetto d'imposta block (identifying data, activity,
  e-commerce, preferential regimes), Quadro C's titolare block, and the
  closing quadri-compilati/firma block.

### Source 2 (companion, the istruzioni)

- **Document:** "AA9/12, ISTRUZIONI PER LA COMPILAZIONE".
- **URL:**
  `https://www.agenziaentrate.gov.it/portale/documents/20143/6020466/AA9_12+istruzioni_2024.pdf/3447f8ab-0055-ec13-b96e-9d0ef6d3e3a6?t=1711542402670`
- **Fetched:** direct `curl`, 2026-07-15. **HTTP 200**, no gate.
- **Size:** 210,717 bytes — matches the scouting subagent's own reported size
  exactly.
- **sha256:** `89438517659fe2b209e0f75a43e8eb2f44243b6be676b80da2d83e95030f0d55`
  — matches the scouting subagent's own reported hash exactly.
- **Pages:** 12.
- **Extraction method:** same `pdfjs-dist` pipeline as Source 1.
- **What it confirms:** the exact Quadro-by-Quadro explanation for every field
  this schema models — e.g. Quadro A's four-way declaration-type selector and
  its legal cross-references, Quadro B's "ATTIVITÀ ESERCITATA E LUOGO DI
  ESERCIZIO" rules (including when `presumedTurnoverEur` must be left blank),
  the two named preferential tax regimes and their legal citations, the
  e-commerce sub-block's "proprio"/"ospitante" distinction, Quadro C's
  residency/domicile rules, and the "Come presentare il modello" section
  (p.2/12) that this schema's `submissionChannel` field and its conditional
  `identityDocumentCopy` document are both drawn from directly.

A backup Camera di Commercio "Modello I1" candidate (individual-enterprise
registration with the Registro delle Imprese) was also screened this cycle
but found only via an unofficial third-party mirror (`tuttocamere.it`, no
`camcom.gov.it` original located, form dated 2008 — stale). AA9/12 was
preferred as the stronger, fresher, directly-hosted source.

## Scope: what v1.0.0 models and what it defers

Modello AA9/12 is a single form serving four distinct declaration types
(business start, data variation, business cessation, VAT-certificate
duplicate request) across nine lettered Quadri (A-I). Per this registry's
established convention for multi-purpose forms (e.g. `gr/aade`'s Δ211,
GOV-3030), v1.0.0 scopes to a single filer pathway — here, the **inizio
attività** (business-start) declaration for an individual entrepreneur/
self-employed worker — rather than attempting every declaration type and
every Quadro in one version.

**Modelled in v1.0.0 (35 `fields[]`, 1 `documents[]` entry):**

| Section | Representative fields | Modelled scope |
|---|---|---|
| Page header | `taxpayerTaxCode` | Full |
| Quadro A | `declarationType`, `activityStartDate` | Declaration-type selector modelled for all 4 values; only `inizio_attivita`'s own date field is modelled (the other 3 types' date/reference fields are out of scope) |
| Quadro B, Dati identificativi | `businessOrIndividualName`, `nonResidentForeignAddress`, `foreignVatNumber` | Full |
| Quadro B, Attività esercitata e luogo di esercizio | `activityCode`, `activityDescription`, `presumedTurnoverEur`, `intraCommunityAcquisitionsFlag`, `premisesAddress/PostalCode/Municipality/Province`, `premisesAccountingRecordsKeptHere` | Full for the single prevailing activity/premises (secondary activities/locations are Quadro G, out of scope) |
| Quadro B, Regimi fiscali agevolati | `favorableTaxRegime` | Full (both named regimes) |
| Quadro B, Attività di commercio elettronico | `ecommerceWebsiteUrl`, `ecommerceWebsiteType`, `ecommerceServiceProvider` | Full |
| Quadro C, Titolare | `ownerTaxCode/Surname/GivenName`, `ownerBirthDate/Municipality/Province`, `ownerResidenceAddress/PostalCode/Municipality/Province`, `ownerAccountingRecordsKeptHere` | Full |
| Come presentare il modello | `submissionChannel`, `documents[].identityDocumentCopy` | Full |
| Quadri compilati e firma | `formsCompiledQuadroA/B/C`, `totalPagesCount`, `declarationSignerTaxCode`, `declarationSignatureDate` | Full for the in-scope Quadri (A/B/C); the checklist also offers D-I on the source form, out of scope here |

**Explicitly deferred (out of scope for v1.0.0):**

- **Quadro A's variazione-dati/cessazione-attività/duplicato-certificato
  fields** — the VAT-number reference and variation/cessation date fields
  that apply only to the other three declaration types, not a fresh business
  start.
- **Quadro D (Rappresentante)** — used only when a court-appointed
  administrator, guardian, curator, heir, or a non-resident's fiscal
  representative signs in the titolare's place; a materially different filer
  scenario from a self-filing individual.
- **Quadro E (Operazioni straordinarie — trasformazioni sostanziali
  soggettive e affitto d'azienda)** — business transfers, successions,
  company-to-sole-trader conversions, and business leases; entirely
  irrelevant to an individual starting a brand-new activity from scratch.
- **Quadro F (Luoghi di conservazione delle scritture contabili)** — multiple/
  additional accounting-record deposit locations, including abroad, beyond
  the single premises/residence location this v1.0.0 already models via the
  two `AccountingRecordsKeptHere` checkboxes.
- **Quadro G (Informazioni inerenti le attività esercitate)** — secondary
  activities and additional business locations beyond the single prevailing
  activity/premises Quadro B already models.
- **Quadro H (Presunzione di cessione — rapporto di rappresentanza)** — a
  narrow notice rebutting a goods-presumption-of-sale rule for a specific
  representation relationship; not part of an ordinary business-start filing.
- **Quadro I (Altre informazioni in sede di inizio attività)** — clientele-
  type, premises-open-to-public, and initial-investment disclosures required
  only for the specific ATECO activity codes listed in the Agenzia delle
  Entrate's 21 December 2006 director's provvedimento (as later amended) — an
  external, form-external code list this v1.0.0 does not enumerate or attempt
  to encode as a conditional gate.
- **The DELEGA block** — the proxy-appointment fields used only when the
  form is filed via a specially delegated person rather than the titolare
  themself.
- **The IMPEGNO ALLA PRESENTAZIONE TELEMATICA block** — the office-facing
  CAF/intermediary transmission undertaking (their own codice fiscale,
  CAF-registry number, and the date they assumed the transmission
  commitment), not an applicant-supplied field.

## Judgment calls

1. **`declarationType` models all four of Quadro A's checkbox values, but
   only `inizio_attivita`'s own conditional field (`activityStartDate`) is
   modelled.** The other three values are recorded on the field so a consumer
   sees the form's own full selector rather than a silently narrowed enum,
   but their own type-specific fields are disclosed out of scope above,
   matching this registry's precedent (e.g. `gr/aade` Δ211, GOV-3030) of
   modelling a shared selector field across all its source values even when
   only one branch's downstream fields are in scope.
2. **`premisesAccountingRecordsKeptHere` and `ownerAccountingRecordsKeptHere`
   are modelled as two independent boolean fields, not a single
   enum/location-choice field.** The source form places one "SCRITTURE
   CONTABILI" checkbox in the Quadro B premises box and a second, separate
   one in the Quadro C residence box; each is genuinely independent (the
   istruzioni describe each in isolation, with no shared radio-group
   framing), so this schema follows this registry's established
   independent-checkbox convention (e.g. `si/ajpes`, GOV-2910; `it/
   poliziadistato`, GOV-3031) rather than fabricating a single either/or
   enum the source does not actually present.
3. **`formsCompiledQuadroA/B/C` are modelled as three independent required
   booleans, not a single multi-value field.** JSON Schema's `enum` type in
   this spec is single-valued and there is no `array` field type in the v0.3
   meta-schema, and the source's own "quadri compilati" checklist is nine
   independent Btn-style checkboxes (a filer ticks every Quadro they used,
   not just one) — the same independent-checkbox reasoning as judgment call
   2, scoped here to only the three in-scope Quadri (A, B, C); D through I
   are disclosed out of scope rather than modelled as always-false fields.
4. **No `requiredWhen`/`notEquals` condition was written against an
   optional/absent field.** `ecommerceWebsiteType`'s conditional relationship
   to `ecommerceWebsiteUrl` (filled in together, or both left blank) is
   disclosed only in `ecommerceWebsiteType`'s own `description`, not encoded
   as a `requiredWhen: {notEquals: null}` rule — deliberately avoiding this
   registry's previously-caught notEquals-empty-string/null absent-field bug
   (an absent optional field evaluates as `undefined`, which a naive
   `notEquals` check against `""`/`null` incorrectly treats as satisfied,
   spuriously firing the conditional requirement). Where a genuine
   requiredWhen condition was needed, `equals` against a concrete enum value
   was used instead (`ecommerceServiceProvider` gated on
   `ecommerceWebsiteType equals "ospitante"`; `identityDocumentCopy` gated on
   `submissionChannel equals "posta_raccomandata"`), which correctly
   evaluates to `false` — not a spurious match — when the gating field is
   itself absent.
5. **`taxpayerTaxCode`/`ownerTaxCode`/`declarationSignerTaxCode` use a
   generic 16-character alphanumeric pattern (`^[A-Z0-9]{16}$`)**, not the
   full structural codice-fiscale checksum regex, matching this registry's
   established precedent (`modello-730` judgment call 5) of avoiding a
   stricter validator that could silently reject a syntactically valid but
   structurally unusual codice fiscale.
6. **`activityCode` uses an ATECO-style pattern
   (`^[0-9]{2}\.[0-9]{2}(\.[0-9]{2})?$`)** covering both the common 6-digit
   (NN.NN.NN) and, where a taxpayer cites only the broader 4-digit
   (NN.NN) classification, the shorter form — the istruzioni direct filers to
   "the economic-activity classification table in force at the time of
   filing" without printing the table itself in either source document, so
   no closed enum of codes is fabricated.
7. **`submissionChannel` models only the three channels available to
   taxpayers not obliged to register with the Registro delle Imprese**
   (in-person at any Agenzia delle Entrate office, registered mail, or
   telematic filing). Taxpayers who are so obliged instead file exclusively
   via the separate ComUnica telematic channel (this registry's own
   `modello-730` VERIFICATION.md's prior Business Formation dead-end finding)
   — that channel remains out of scope for this document, disclosed directly
   in `submissionChannel`'s own field description rather than added as a
   fourth enum value this schema cannot otherwise model (ComUnica has no
   plain field-by-field form of its own).

## Test run (Phase 4)

No live submission was attempted: Modello AA9/12 assigns a real, permanent
Partita IVA and is filed either in person, by post, or through Agenzia delle
Entrate's own authenticated Fisconline/Entratel telematic services — creating
a live VAT registration against Italy's tax administration with fabricated
data is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and checked with a purpose-written script
(`validate_instance.mjs`) that compiles `schema.json`'s own `fields[]`
(`type`/`validation`/`required`) into a JSON Schema draft 2020-12 document
and checks it with `ajv`, plus a from-scratch evaluator for the shared
Condition grammar (leaf `field`/operator, `all`/`any`/`not` composition) that
checks both `fields[].requiredWhen` and every `documents[]` entry's static
`required`/`requiredWhen` status against a `documents: [{id, provided}]`
array. The script and its rendered PDF-checking artifacts were discarded
after use, not committed.

```
$ node validate_instance.mjs registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json \
    conformance/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/resident-sole-trader-in-person-filing.json
Static (required/type/pattern/enum/minimum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json \
    conformance/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/artisan-registered-mail-with-ecommerce.json
Static (required/type/pattern/enum/minimum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — six negative fixtures, each targeting a distinct
validation rule, run against the same script to confirm it actually catches
violations rather than passing vacuously:

```
$ # mutation-control-missing-required-field.json: 'businessOrIndividualName' (required: true) removed
Static (required/type/pattern/enum/minimum) validation: FAIL
 - (root) must have required property 'businessOrIndividualName'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: submissionChannel=posta_raccomandata
$ # but documents=[] (identityDocumentCopy's requiredWhen not satisfied)
Static (required/type/pattern/enum/minimum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'identityDocumentCopy' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-enum-violation.json: 'submissionChannel' set to 'fax'
Static (required/type/pattern/enum/minimum) validation: FAIL
 - /submissionChannel must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-pattern-violation.json: 'taxpayerTaxCode' shortened to 6 characters
Static (required/type/pattern/enum/minimum) validation: FAIL
 - /taxpayerTaxCode must match pattern "^[A-Z0-9]{16}$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-requiredwhen-violation.json: declarationType=inizio_attivita
$ # but activityStartDate omitted
Static (required/type/pattern/enum/minimum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'activityStartDate' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-minimum-violation.json: 'totalPagesCount' set to 0 (minimum: 1)
Static (required/type/pattern/enum/minimum) validation: FAIL
 - /totalPagesCount must be >= 1
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL
```

The `mutation-control-missing-required-document.json` case specifically
exercises `documents[].requiredWhen` (as opposed to a plain static-`required`
case) — a validator that only checks static `required: true` documents and
ignores conditional `requiredWhen` rules would incorrectly accept this
fixture, which is exactly the gap this fixture exists to catch.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json
ok   registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json
ok   registry/it/agenzia-entrate/modello-aa9-12-inizio-attivita-partita-iva/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (460 documents total, including this
one, up from 459 before this cycle) also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Other candidates screened this cycle (not authored)

- **Greece (GR) Passport**: a strong candidate found this cycle — the
  Hellenic Police's own official specimen application form
  (`passport.gov.gr`, "Υπόδειγμα αίτησης έκδοσης Διαβατηρίου"), a scanned
  specimen (not a fillable AcroForm) but fully legible with every field label
  visible, plus detailed instructions/supporting-documents/legislation pages.
  Delegated as a child issue rather than authored in this same PR, per this
  registry's one-deliverable-per-PR convention.
- **Greece (GR) National ID**: a confirmed dead end this cycle — the Δελτίο
  Ταυτότητας (national ID card) is a pure in-person, biometric-appointment
  system (booking only, via `id.gov.gr`/TaxisNet); the application-declaration
  itself is generated and printed by the issuing police officer from the
  civil registry at the counter, not filled in advance by the citizen, and
  two fingerprints are captured live. Confirmed directly from `mitos.gov.gr`
  (Greece's own National Administrative Procedures Registry): submission type
  is explicitly "Κατάθεση από τον αιτούντα (αποκλειστικά δια ζώσης)" —
  in-person only, no other channel exists. See CATALOG.md's Known Gaps
  section for the full disclosure.
- **Italy (IT) National ID**: a strong candidate found this cycle — the Carta
  d'Identità Elettronica (CIE), sourced from a municipality's (Comune di Tre
  Ville) own directly-downloadable application/minor/parental-consent PDF
  trio, corroborated by the national `cartaidentita.interno.gov.it` portal's
  prose walkthrough (booking-optional, not hard-gated). Delegated as a child
  issue rather than authored in this same PR.

See CATALOG.md's Known Gaps & Opportunities section for the full disclosure.
