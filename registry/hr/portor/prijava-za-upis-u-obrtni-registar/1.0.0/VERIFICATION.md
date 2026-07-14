# Verification record — `hr/portor/prijava-za-upis-u-obrtni-registar` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2892**), following
directly on GOV-2883's cycle, which screened Croatia's six verticals and
identified this exact form as a strong, genuine, unauthenticated Business
Formation candidate — left as ready-to-author backlog rather than authored
that cycle (GOV-2883 scoped its own cycle to Taxes only). This document opens
Croatia's **Business Formation vertical (2 of 6)**, following Taxes
(`hr/porezna-uprava/prijava-poreza-na-dohodak`, GOV-2883).

## Source re-verification (Phase 1)

- **Authority:** PORTOR (Portal Obrtnog registra Republike Hrvatske), the
  Ministry of Economy's (Ministarstvo gospodarstva) craft/trade register
  portal; the form itself is filed with the competent county-level (or City
  of Zagreb) Ured državne uprave, per Zakon o obrtu (Crafts Act) Art. 2(4).
- **URL:** `https://portor.gov.hr/dokumenti/OR_prijava_za_upis_u_obrtni_registar.doc`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -L`, not trusted from GOV-2883's prior report.
- **HTTP status:** `200`. **Content-Type:** `application/msword`. **Size:**
  `141,824` bytes. **sha256:**
  `cb809f58ad127ef7297d0e8921fda811f50d2524d1005d65cfabbdd7a767303e`
  — independently computed this cycle with `sha256sum`, and it matches the
  figure recorded in GOV-2883's VERIFICATION.md and CATALOG.md exactly. No
  discrepancy.
- **File type:** confirmed via the file's magic bytes (`d0cf11e0`, the OLE2/
  Compound File Binary signature) — a legacy Microsoft Word 97-2003 binary
  `.doc`, not a PDF and not an XML-based (OOXML/`.docx`) or AcroForm/XFA
  fillable document. `pdftotext`/`antiword`/`catdoc`/`olefile` are not
  available in this environment.
- **Extraction method:** the npm package `word-extractor` (installed fresh
  this cycle via `npm install word-extractor` into a scratch directory), used
  as `new WordExtractor().extract(path).then(doc => doc.getBody())`. The
  extracted body was read in full (127 lines), independently of GOV-2883's
  prior excerpt, and matches it exactly — no additional content, footnotes,
  or fields were found beyond what GOV-2883 had already transcribed.

## Field inventory (Phase 2)

All 52 `fields[]` entries and the 1 `documents[]` entry, and their exact
source-form section/line reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header | `filingCountyOfficeOrZagreb`, `filingServiceBranch` | Full |
| Podaci o vlasniku (owner) | `ownerFullNameWithFathersName`, maiden/mother names, DOB/POB, `ownerSex`, `ownerMbg`, `ownerOib`, `ownerOccupation`, full address block (16 fields) | Full |
| Predmet prijave (transaction type) | `applicationType` + gated sub-fields for all three transaction types (6 fields) | Full — all three transaction types modelled (see judgment call 1 below) |
| Podaci o obrtu (business identity + seat address) | `businessName`, `businessAbbreviatedName`, seat address incl. optional fax/e-mail/website (11 fields) | Full |
| Vrsta obrta (regulatory category) | `businessTypeCategory`, `privilegedTypeDetail` (2 fields) | Full |
| Obavljanje obrta (year-round/seasonal) | `businessConductType`, `seasonStartDate`, `seasonEndDate` (3 fields) | Full |
| Stručna osoba (qualified person, regulated crafts only) | `qualifiedPersonIsOwnerOrPartner`, `qualifiedPersonIsEmployee` (2 fields, `exclusivityGroups`) | Full |
| Djelatnosti i stručne osobe obrta (activities table) | `activity1..3Name`/`activity1..3QualifiedPerson` (6 fields) | Bounded repeating group capped at 3 of the paper form's own 18 numbered rows — see judgment call 2 below |
| Uz prijavu prilažem (attached documents) | `attachedDocumentsDescription` | Full, modelled as free text (the paper form itself is 9 blank lines, not a predefined checklist) |
| Closing | `applicantName`, `signaturePlace`, `signatureDate`, `documents[].applicantSignature` | Full |

Total: **52 `fields[]`** entries (23 `required: true`) plus **1
`documents[]`** entry (a required attestation), **4 `crossFieldValidation`**
rules, and **1 `exclusivityGroups`** entry.

## Access notes and judgment calls

1. **All three transaction types (Upis obrta / Promjena podataka / Prestanak
   obrta) are modelled via a single `applicationType` enum with
   `requiredWhen`/`visibleWhen`-gated sub-fields, rather than scoping v1.0.0
   to new registration alone.** The source form presents all three as
   equally weighted, first-class checkbox options on one document, with no
   separate edition per transaction type — unlike, say, a multi-page form
   where one transaction type dominates and the others are a minor footnote.
   This mirrors this registry's established `transactionType`/
   `applicationType`-enum convention for exactly this shape of form (e.g.
   `ca/on/mto/vehicle-registration`'s `transactionType`
   [`new_registration`/`replacement`], `us/ca/dmv/vehicle-title-transfer`'s
   `transactionType`). Four `crossFieldValidation` rules (`when` +
   `requireAbsent`) enforce that a filer completing one transaction type's
   sub-fields does not simultaneously populate another transaction type's
   sub-fields — a stronger guarantee than `requiredWhen` alone, which only
   enforces presence, not absence, of the non-selected branches' fields.
2. **The 18-row `Djelatnosti i stručne osobe obrta` (activities and
   qualified persons) table is bounded to 3 rows**, not modelled in full.
   This mirrors this registry's own immediately-adjacent Croatian precedent,
   `hr/porezna-uprava/prijava-poreza-na-dohodak`, which bounds its own
   repeating tables (dependents, employers, pension payers) at 3 of the
   form's own 6-7 row capacity for the same reason: 3 rows covers the
   overwhelming majority of real filers (most craft businesses register a
   small number of activities) while keeping the schema's size proportionate.
   The form's true maximum of 18 rows is disclosed both in the schema's own
   `description` and here.
3. **The pick-one `Obavljanje obrta` (year-round/seasonal) and `Stručna
   osoba` (qualified-person role) groups use two different mechanisms**,
   chosen for fit rather than uniformity: `businessConductType` is modelled
   as an `enum` (`year_round`/`seasonal`) with a `crossFieldValidation` rule
   requiring the season dates be absent when `year_round` is selected —
   appropriate because the seasonal branch has real dependent fields
   (`seasonStartDate`/`seasonEndDate`) to guard. `Stručna osoba`, by
   contrast, is a bare pair of checkboxes with no dependent fields at all
   (`vlasnik/ortak` vs. `djelatnik`), which is precisely the motivating case
   the spec's `exclusivityGroups` mechanism (§8.4) describes ("every
   motivating example is a pair of boolean checkboxes") — so it is modelled
   as two booleans (`qualifiedPersonIsOwnerOrPartner`/
   `qualifiedPersonIsEmployee`) under one `exclusivityGroups` entry instead
   of a `crossFieldValidation` rule with no substantive field to guard. The
   `Predmet prijave` (transaction-type) pick-one is modelled as the
   `applicationType` enum itself (mutual exclusivity is inherent to a single
   enum field), with `crossFieldValidation` guarding its several dependent
   sub-fields per judgment call 1.
4. **No shared/reusable "address" field-type exists in `spec/v0.3`** — the
   spec's field model is deliberately flat (§ "Nested field model" is listed
   among rejected/future extensions, not present in v0.3). Both the owner's
   residential address and the business's registered-seat address are
   therefore modelled as parallel sets of flat, individually named fields
   (`owner*`/`business*` prefixes), the same pattern this registry's
   `de/gewerbeamt/business-registration` schema uses for its own two parallel
   address blocks (`homeAddress*`/`premises*`). This is not a shortcut but
   the registry's actual established convention for repeated address shapes
   under the current flat field model.
5. **`ownerOib` and (were an OIB field needed for the business itself) reuse
   the identical 11-digit pattern** (`^[0-9]{11}$`) already established in
   `hr/porezna-uprava/prijava-poreza-na-dohodak`'s `oib` field, for
   jurisdictional consistency. Note the source form does not itself print a
   separate business-entity OIB field (only the owner's), so only `ownerOib`
   is modelled.
6. **`ownerMbg` (the legacy JMBG-style master citizen number) is modelled as
   optional**, since Croatia's OIB system replaced it in 2009; younger
   applicants may never have been issued an MBG even though the form still
   prints the field.
7. **`ownerMaidenName` and `motherMaidenName` are modelled as optional**
   (blank when not applicable), while `motherGivenName` is modelled as
   required — mirroring this registry's general convention (e.g.
   `de/gewerbeamt/business-registration`'s `birthName`) of using field
   absence, not a forced empty value, to represent "not applicable," even
   though the source form itself does not mark these fields with its own
   asterisk-optional convention (which the source form reserves for mobile
   phone, fax, e-mail, and website only).
8. **`documents[].applicantSignature` carries no `statement` member.** Unlike
   several U.S.-sourced forms whose closing block prints an explicit typed
   certification sentence, this Croatian form's closing block is only a
   physical signature line with no accompanying attestation text — `statement`
   is `OPTIONAL` per spec §9.1 and is correctly omitted here rather than
   fabricated.
9. **`authority.operatedBy.basis` cites the Zakon o obrtu (Narodne novine
   143/13, 127/19, 41/20) and its Art. 2(4)**, independently researched this
   cycle via `zakon.hr`'s consolidated text and a cached `vlada.gov.hr`
   enactment record (the form itself prints no legal-basis citation line,
   the same disclosed gap `hr/porezna-uprava/prijava-poreza-na-dohodak`
   encountered for its own `authority.operatedBy.basis`).

## Test run (Phase 3)

No live submission was attempted: PORTOR's e-Obrt online-initiation channel
is an authenticated, credential-based system, and the paper channel requires
mailing or hand-delivering an original signed form to a county Ured državne
uprave — submitting fabricated applicant data against a live Croatian
government registry is not a safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/hr/portor/prijava-za-upis-u-obrtni-registar/1.0.0/schema.json
ok   registry/hr/portor/prijava-za-upis-u-obrtni-registar/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/hr/portor/prijava-za-upis-u-obrtni-registar/1.0.0/schema.json
ok   registry/hr/portor/prijava-za-upis-u-obrtni-registar/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run after regenerating `tools/govschema-client/registry-index.json`
(via `npm run build-index`) confirms no regression:

```
$ node tools/validate.mjs
433/433 document(s) passed. 3/3 mapping.json companion(s) passed.
```

(Up from 432/432 on `main` before this document was added.)
