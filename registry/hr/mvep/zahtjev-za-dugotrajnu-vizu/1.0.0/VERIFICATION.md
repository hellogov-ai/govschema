# Verification record — `hr/mvep/zahtjev-za-dugotrajnu-vizu` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2900/GOV-2902**), and it
**reverses the prior GOV-2883 cycle's own screening note**, which flagged
this exact form as a "confirmed duplicate, not authored" without an
independent field-by-field pass. Opens Croatia's **Visa vertical (3 of 6)**.

## Why this candidate, and why the reversal

GOV-2883's own VERIFICATION.md (candidate 4 of its five-vertical screening
pass) compared this form only at the level of "the same 30-numbered-field
sequence... confirming this is the same EU long-stay (Type D) visa template
lineage already modelled multiple times in this registry," citing the
`pl/mf/zeznanie-pit-37` precedent for Poland's equivalent form. That
comparison was never actually carried out field-by-field against this exact
document — it was a pattern-match on rubrika count and general shape, not a
verified content diff. This cycle performed the actual field-by-field
comparison (see "Duplicate-detection reconciliation" below) and found
material, Croatia-specific content the sibling German/Bulgarian/Spanish
templates do not carry, reversing the "duplicate" finding. This is the same
reversal pattern already established for Spain (`GOV-1861`,
`es/maec/solicitud-visado-nacional`, which similarly overturned an earlier
unverified duplicate finding).

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Ministarstvo vanjskih i europskih poslova (Ministry of
  Foreign and European Affairs, MVEP).
- **URL:** `https://mvep.gov.hr/UserDocsImages/dokumenti/obrasci/LongtermVisaApplication-Croatian.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl`.
- **HTTP status:** 200. **Content-Type:** `application/pdf`. **Size:**
  678,426 bytes. **sha256:**
  `09f556946c286a349ecb7cfea2078a6dfd0233c975c252d030fe4faabe857ec3`
  (independently computed this cycle with `sha256sum`, not trusted from the
  issue brief that cited the same value — both now independently agree).
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.js`, CommonJS `require`, this registry's established
  technique for this environment). `page.getAnnotations()` and
  `doc.getFieldObjects()` both returned **zero** Widget annotations and no
  AcroForm field dictionary across all **3** pages — only a single, unrelated
  `Link` annotation on page 3 — confirming a static, print/hand-fill
  template, not a fillable AcroForm PDF. `page.getTextContent()` was used
  instead, reading the form's own printed rubrika numbers (1-30, with
  sub-items like 7's nationality-at-birth/other-nationalities lines) across
  all 3 pages, in full, independently of any prior extraction or of this
  cycle's own issue brief's field list.
- **Discrepancy disclosed:** the issue brief describing this cycle's task
  states "Only 1 AcroForm widget (a signature field)." Independent
  re-extraction this cycle found **zero** AcroForm/Widget objects of any
  kind (confirmed both via `page.getAnnotations()` per page and via
  `doc.getFieldObjects()`, and cross-checked with a raw byte-level regex
  scan for `/Subtype /Widget`, `/AcroForm`, and `/FT /Sig` across the raw
  PDF bytes — none present, and the file has no `/ObjStm` content that could
  hide a widget dictionary from `pdfjs-dist`'s own object graph). The
  practical consequence is the same either way (no fillable signature
  widget to extract data from; the signature block is a printed line filled
  by hand), so this does not change the modelled scope, but the specific
  "1 widget" claim itself is not reproducible and is corrected here rather
  than silently repeated.
- **What it confirms:** every field this document models, verbatim,
  including the full 11-value purpose-of-stay enum in rubrika 22, the
  7-value marital-status enum in rubrika 9, and the closing HVIS
  data-protection declaration text used in
  `documents[].declarationAttestation`.

## Duplicate-detection reconciliation

A field-by-field comparison was performed against the three already-modelled
EU-harmonized long-stay (Type D) visa templates in this registry:

| | `de/auswaertiges-amt` | `bg/mvnr` | `es/maec` | `hr/mvep` (this document) |
|---|---|---|---|---|
| Pages | 5 | 4 | — | **3** |
| Approx. distinct fields | 99 | 108 | 60 | **50** |
| Organizing structure | 16 numbered sections, each a labelled sub-block (identity, travel document, spouse, children, parents, previous stays, intended stay, residence/family, purpose, references, profession, duration, means/insurance, criminal record, immigration history, health) | Similarly multi-section with parent/child/spouse repeating tables | Similarly multi-section | **30 flat numbered rubrike, no parent/child sections, no criminal-conviction or notifiable-disease declarations at all** |
| National ID field | absent | absent | absent | **present (rubrika 11, `nationalIdentificationNumber`)** |
| Pre-approved temporary-residence sub-block | absent (Germany's visa is the entry document itself, no separate prior residence-permit approval step) | absent | absent | **present (rubrika 21) — Croatia's own two-step residence/visa construct** |
| Purpose-of-stay taxonomy | 6 values (Employment, Study, Au pair, Language course, Family reunion, Other) | different, narrower set | different, narrower set | **11 values (rubrika 22), including Digital nomad, EEA long-term resident stay, Posted worker employment — none of which appear in any sibling template** |
| Family-reunification sponsor sub-block | none (Germany's form asks about the applicant's own spouse/children/parents, not a Croatia-resident sponsor being joined) | none in this exact shape | none in this exact shape | **present (rubrika 28) — names the Croatia-resident family member the applicant depends on, with their own address/permit-type/nationality fields** |
| Employer/school contact in destination country | none as a distinct field (Germany's "references in Germany" section is generic) | — | — | **present as a distinct field (rubrika 29), separate from the abroad-based rubrika 20 employer field** |
| Criminal-conviction / notifiable-disease declarations | present (sections 14, 16) | present | — | **absent from this document's own printed rubrike entirely** — this is a materially shorter form that does not ask these questions at all |
| Father/mother identification section | present (section 4) | — | — | **absent** |

**Conclusion:** this is not a re-skin of the same template with translated
labels — it is a structurally shorter, differently organized form (30 flat
rubrike vs. Germany's 16 labelled sections) that omits entire question
categories the sibling templates carry (parents, criminal convictions,
notifiable diseases) while adding Croatia-specific content none of them
carry (national ID number, the two-step residence-approval construct, the
11-category purpose taxonomy, and the named-sponsor family-reunification
block). **Not a duplicate.**

## Field inventory (Phase 2)

All 50 `fields[]` entries and 7 `documents[]` entries, and their exact
DODATAK 1.B rubrika reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by rubrika range:

| Rubrike | Representative fields | Modelled scope |
|---|---|---|
| Header | (For official use only: application date, HVIS number, receiving mission, processing officer, consular decision) | **Excluded** — consular-adjudication-only, not applicant-facing |
| 1-9 | `surname`, `birthOrFormerSurname`, `firstNames`, `dateOfBirth`, `placeOfBirth`, `countryOfBirth`, `currentNationality`, `nationalityAtBirthIfDifferent`, `otherNationalities`, `sex`, `maritalStatus` (11 fields) | Full |
| 10-11 | `parentalRightsOrLegalRepresentativeDetails`, `nationalIdentificationNumber` (2 fields) | Full |
| 12-17 | `travelDocumentType`, `otherTravelDocumentDetails`, `travelDocumentNumber`, `travelDocumentDateOfIssue`, `travelDocumentValidUntil`, `travelDocumentIssuedByCountry`, `applicantAddressAndEmail`, `applicantPhone` (8 fields) | Full |
| 18 | `residesInThirdCountry` + 3 conditional sub-fields (4 fields) | Full |
| 19-20 | `currentOccupation`, `currentEmployerOrEducationalEstablishment` (2 fields) | Full |
| 21 | `temporaryResidenceApprovalNumber`, `...IssuedBy`, `...ValidFrom`, `...ValidTo` (4 fields) | Full |
| 22-23 | `purposeOfTemporaryResidence` (11-value enum), `additionalPurposeInformation` (2 fields) | Full |
| 24-27 | `numberOfEntriesRequested`, `intendedArrivalDate`, `borderCrossingPointOfEntry`, `previouslyFingerprintedForCroatianVisa` + 2 "if known" sub-fields (6 fields) | Full |
| 28 | `familyReunificationRelationship` + `otherRelativeDetails` + 6 sponsor sub-fields (8 fields) | Full |
| 29-30 | `employerOrEducationalEstablishmentInCroatia`, `intendedAccommodationAddressInCroatia` (2 fields) | Full |

Total: **50 `fields[]`** entries (23 unconditionally `required: true`, plus
12 further fields conditionally required via `requiredWhen`) and **7
`documents[]`** entries (4 unconditionally required: `applicantPhoto`,
`travelDocumentCopy`, `travelHealthInsuranceProof`, `declarationAttestation`;
`invitationProof`/`meansOfTransportProof` optional per the header checklist's
own layout; `priorResidenceOrWorkPermitProof` conditionally required when
`residesInThirdCountry` is true).

## Access notes and judgment calls

1. **Header "Isključivo za službenu uporabu" (For official use only) block
   excluded entirely.** Application date, HVIS application number, the
   receiving mission/service-provider, the processing officer's name, and
   the consular decision (refused/issued, validity dates, number of
   entries, approved days of stay) are all consular-adjudication-only
   content filled in by mission staff, never by the applicant — consistent
   with this registry's convention of excluding staff-only tracking fields
   (e.g. `bg/mvnr`'s excluded "Попълва се служебно" column).
2. **No invented `requiredWhen` gates beyond what the form itself prints.**
   `nationalityAtBirthIfDifferent` (rubrika 7), `parentalRightsOrLegal
   RepresentativeDetails` (rubrika 10), and `sponsorResidencePermitType
   AndNumber` (rubrika 28) each lack a printed boolean toggle on the source
   form (no explicit "is this different?" / "is this a minor?" / "is the
   sponsor a non-citizen?" checkbox), so each is modelled as unconditionally
   optional rather than gated on a fabricated boolean field — the same
   principle already applied to `bg/mvnr`'s parental-rights field.
3. **`priorFingerprintDate`/`priorVisaNumber` (rubrika 27) use `visibleWhen`,
   not `requiredWhen`.** The form's own printed text marks both "ako je
   poznat" (if known), so even when `previouslyFingerprintedForCroatianVisa`
   is `true`, these two sub-fields remain optional — the same "if known"
   treatment already established for e.g. `bg/mvnr`'s prior-refusal detail
   fields.
4. **`familyReunificationRelationship` and the sponsor sub-block (rubrika
   28) are gated on `purposeOfTemporaryResidence` equalling "Family
   reunification"**, not on a separate boolean, since rubrika 22 is itself
   the only printed condition under which rubrika 28's heading ("U slučaju
   spajanja obitelji...", "In case of family reunification...") applies.
5. **`thirdCountryResidencePermitTypeOrEquivalent`/`...Number`/`...
   ValidUntil` (rubrika 18) use `requiredWhen`, not `visibleWhen`**, unlike
   rubrika 27's "if known" sub-fields, because rubrika 18's own printed text
   has no "if known" qualifier — the three blanks directly follow "Da."
   (Yes.) with no disclaimer.
6. **`documents[].priorResidenceOrWorkPermitProof` is gated on
   `residesInThirdCountry` equalling `true`, not on `temporaryResidence
   ApprovalNumber` being present.** The form's own header "Priložena
   dokumentacija" (attached documentation) checklist does not print a
   distinct "residence/work permit" line item; this document instead ties
   the requirement to rubrika 18's own conditional text ("Dozvola boravka
   ili istovrijedna isprava"), which is the closest printed anchor for that
   evidentiary requirement — a disclosed judgment call, not a form-printed
   checkbox.
7. **`otherMaritalStatusDetails` requiredWhen `maritalStatus` equals
   "Other"** — the form's rubrika 9 prints "Ostalo (molimo navedite)"
   (Other, please specify), the same pattern as `travelDocumentType`'s own
   "Other" branch.
8. **No `edition` axis.** This is a standing national-visa application
   form, not a dated annual filing, consistent with this registry's
   convention for non-time-versioned application forms.
9. **`documents[]` categories are all `supporting-evidence` except the
   closing declaration (`attestation`)** — no `identity-document` or
   `payment` category applies; the form's own text states "Ovaj obrazac se
   ne naplaćuje" (This form is free of charge), so no fee/payment document
   is modelled.

## Conformance run (Phase 3, mock-data trace)

No live submission was attempted: this form is filed in person or by mail
at a Croatian diplomatic/consular mission, and submitting fabricated
applicant data against a live foreign-ministry visa process is not a safe
or reversible action.

Instead, two hand-authored mock instances were built and checked against
`schema.json`'s own `required`/`requiredWhen`/`validation.enum` grammar with
a disposable, from-scratch Node.js checker (not committed, per this
registry's own established practice of not committing one-off verification
scripts):

- **`single-applicant-basic`** — an unmarried applicant, no residence in a
  third country, filing to study, single applicant with no
  temporary-residence pre-approval sub-block populated, multiple entries
  requested, no prior Croatian-visa fingerprint history. 24 of 50 fields
  populated. **PASS.**
- **`family-reunification-with-sponsor`** — a married applicant currently
  resident in a third country (exercising the full rubrika-18 residence-
  permit sub-block), filing through a fully populated temporary-residence
  pre-approval sub-block (rubrika 21), for family reunification with a
  named Croatia-resident spouse (exercising the full rubrika-28 sponsor
  sub-block), with a prior Croatian visa and fingerprint history disclosed.
  42 of 50 fields populated. **PASS.**

Four mutation-control checks confirmed the checker actually enforces the
gates rather than passing vacuously:

1. Dropping `travelDocumentNumber` from `single-applicant-basic`
   (unconditionally required) — correctly flagged missing.
2. Dropping `sponsorSurname` from `family-reunification-with-sponsor` while
   `purposeOfTemporaryResidence` stayed `"Family reunification"`
   (conditionally required) — correctly flagged missing.
3. Setting `sex` to an out-of-enum value (`"Unspecified"`) on
   `single-applicant-basic` — correctly flagged as an enum violation.
4. Setting `residesInThirdCountry` to `true` on `single-applicant-basic`
   without adding the corresponding `thirdCountryResidencePermitType
   OrEquivalent`/`...Number`/`...ValidUntil` fields or the
   `priorResidenceOrWorkPermitProof` document — correctly flagged all four
   as missing.

Each mutation raised exactly its expected error(s), with no other rule
firing unexpectedly.

```
$ node tools/validate.mjs registry/hr/mvep/zahtjev-za-dugotrajnu-vizu/1.0.0/schema.json
ok   registry/hr/mvep/zahtjev-za-dugotrajnu-vizu/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/hr/mvep/zahtjev-za-dugotrajnu-vizu/1.0.0/schema.json
ok   registry/hr/mvep/zahtjev-za-dugotrajnu-vizu/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run after regenerating `tools/govschema-client/registry-index.json`
(via `npm run build-index`) confirms no regression:

```
$ node tools/validate.mjs
434/434 document(s) passed. 3/3 mapping.json companion(s) passed.
```

(Up from 433/433 on `main` before this document was added.)

## Scope and jurisdiction notes

- Advances Croatia's **Visa vertical** to 3 of 6 (Taxes, Business Formation,
  Visa). DMV, Passport, and National ID remain confirmed dead ends per
  GOV-2883's screening (Croatia's MUP civil-document/vehicle processes are
  officer/system-mediated at the counter, no public blank template
  distributed).
- `jurisdiction.level` is `national` — MVEP is Croatia's national foreign
  ministry and the issuing authority for national (Type D) visas.
- `process.type` is `application`, matching this registry's convention for
  visa application forms (e.g. `de/auswaertiges-amt`, `bg/mvnr`, `ee/vm`).
- `process.language` is `hr`: the modelled edition is the Croatian-language
  specimen at the URL cited above. MVEP's site also hosts an
  English-language edition of the same form
  (`LongtermVisaApplication-English.pdf`, referenced in GOV-2883's own
  screening note) not modelled by this v1.0.0.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming the source PDF's
sha256 is unchanged (a changed hash would require re-diffing the printed
rubrike text before assuming no field-level change); (2) re-confirming
Croatia's DMV/Passport/National ID dead-end findings have not changed
(e.g. a newly published blank template); (3) upgrading `status` from
`draft` to `verified` once a second independent reviewer cross-checks this
record against the live source.
