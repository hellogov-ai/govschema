# Verification record — `hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2902**), a follow-on to
GOV-2883 (opened Croatia via Taxes), GOV-2887, and GOV-2892 (Business
Formation, 2 of 6). This document opens Croatia's **Visa** vertical,
**Croatia now stands at 3 of 6 verticals**.

## Why this candidate needed a fresh look, not a re-screen

A prior cycle (GOV-2883, `hr/porezna-uprava/prijava-poreza-na-dohodak`'s own
VERIFICATION.md) had already examined this exact source and set it aside
with the following note: "Extracted with `pdfjs-dist` and compared
field-by-field against the already-modelled EU-harmonized long-stay-visa
template (`de/auswaertiges-amt/national-visa-application`,
`bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d`,
`es/maec/solicitud-visado-nacional`): the same 30-numbered-field sequence
... confirming this is the same EU long-stay (Type D) visa template lineage
already modelled multiple times in this registry. **Confirmed a duplicate,
not authored**." That comparison, on inspection, only checked that the two
forms share the same opening numbered-item sequence and a superficially
similar topic list — it did not read Germany's own field list or Croatia's
own item 21/22/28/29 content in enough detail to notice they diverge.

This task brief explicitly named this exact prior finding and asked for the
comparison to be redone from scratch rather than trusted, the same
discipline `es/maec/solicitud-visado-nacional`'s own VERIFICATION.md (GOV-1861)
applied to a near-identical prior "duplicate" finding (GOV-1652) against
this same German template. This cycle re-fetched Croatia's own source
directly, re-extracted it in full with `pdfjs-dist`, and re-fetched/re-read
`de/auswaertiges-amt/national-visa-application`'s own committed
`schema.json` (81 fields) and source PDF for a genuine field-by-field
re-comparison.

**Finding: the prior "field-for-field duplicate" characterization does not
hold up.** The two forms' identity blocks (Croatia's items 1-9: surname,
former surname, first names, date/place/country of birth, nationality,
sex, marital status) do follow the same Schengen-harmonized numbering
convention already documented elsewhere in this registry as shared
boilerplate across EU visa forms (see `es/maec/solicitud-visado-nacional`'s
own VERIFICATION.md, which reached the same "shared opening block, diverges
sharply afterward" conclusion for the Spanish form against this same German
template). Past that opening block the two forms have almost no structural
overlap:

- **Germany's own form** (`de/auswaertiges-amt/national-visa-application`'s
  committed 81-field list, re-read this cycle) has: a full spouse-details
  section; a children table; an unconditional parents section (father and
  mother, each with name/DOB/place-of-birth/nationality/residence); a "have
  you been to Germany before, list your last five stays" block; an
  accommodation-type question; a "do you intend to maintain a permanent
  residence outside Germany" question; a "will family members accompany
  you" question; references in Germany; means of subsistence;
  health-insurance coverage; and a criminal-conviction disclosure (in
  Germany / abroad) and a notifiable-disease disclosure. None of this has
  any counterpart on Croatia's form.
- **Croatia's own form** (re-extracted this cycle, 3 pages, 51 modelled
  fields) has, past its own item 9: a minors' guardian block (item 10,
  ordinary overlap with nearly every visa form in this registry, including
  Germany's); a **national identification number** field (item 11) with no
  German counterpart at all; travel-document and contact/residence/
  occupation fields (items 12-20, ordinary overlap); a **temporary-residence
  pre-approval sub-block** (item 21: approval number, issuing police
  administration/station, validity dates) — genuinely specific to Croatia's
  own two-step residence/visa construct, no German counterpart; an
  **11-category purpose-of-stay taxonomy** (item 22: family reunification,
  work, secondary education, posted-worker work, study, EEA-long-term-
  resident stay, research, digital-nomad stay, humanitarian reason, other
  purposes, registered partnership) against Germany's own 6-value enum
  (Employment/Study/Au pair/Language course/Family reunion/Other) — three
  of Croatia's eleven categories (posted-worker work, EEA-long-term-
  resident stay, digital-nomad stay) have no German equivalent at all; entry/
  arrival/fingerprint-history fields (items 23-27, ordinary overlap); a
  **family-reunification sponsor sub-block** (item 28: relationship,
  sponsor's name/DOB/nationality/residence-permit/address) — structurally
  distinct from Germany's own spouse/children/parents sections, which
  describe the *applicant's own* family, not a Croatia-resident sponsor;
  and an **employer/educational-establishment-in-Croatia contact block**
  (item 29), distinct from item 20's applicant's-home-country employer/
  school field, with no German counterpart.

Net: Croatia's form shares only its opening ~9-item Schengen-harmonized
identity block with Germany's, the same kind of shared boilerplate this
registry already treats as expected convergence rather than duplication
(see the ES/GOV-1861 precedent above). Past that block the two forms
diverge completely in both directions — Germany has extensive content
(spouse, children, parents, prior-Germany-stays, accommodation, health,
criminal history) absent from Croatia's form, and Croatia has extensive
content (its own national-ID field, the temporary-residence pre-approval
sub-block, its own 11-category purpose taxonomy, the sponsor/employer-in-
Croatia blocks) absent from Germany's form. This is a genuine, distinct
national form, not a republication — the prior GOV-2883 screening note is
corrected by this document.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Ministarstvo vanjskih i europskih poslova (MVEP, Ministry
  of Foreign and European Affairs).
- **Document:** "DODATAK 1.B — Obrazac zahtjeva za dugotrajnu vizu (viza D)"
  / "ZAHTJEV ZA DUGOTRAJNU VIZU (VIZA D)."
- **URL:** `https://mvep.gov.hr/UserDocsImages/dokumenti/obrasci/LongtermVisaApplication-Croatian.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl` (not trusted from any prior report).
- **HTTP status:** 200. **Content-Type:** `application/pdf`. **Size:**
  678,426 bytes (`Content-Length` header and independently confirmed via
  `wc -c`). **sha256:**
  `09f556946c286a349ecb7cfea2078a6dfd0233c975c252d030fe4faabe857ec3`
  (independently computed this cycle with both `sha256sum` and a standalone
  Python `hashlib.sha256` re-hash of the same downloaded bytes — both
  agree).
- **Extraction method:** downloaded directly, then parsed with
  `pdfjs-dist@6.1.200` (`legacy/build/pdf.mjs`), matching this registry's
  established technique for this environment, which has no
  `pdftotext`/`pdftoppm`. `page.getAnnotations()` returned **zero** Widget
  annotations across all **3** pages — a fully static hand-fill/print
  template. This is a stronger finding than the task brief's own working
  assumption of one fillable signature widget: the only annotation found on
  any page was a single page-3 `Link` annotation (a `mailto:azpo@azpo.hr`
  hyperlink inside the closing HVIS data-protection paragraph, not a form
  field). `page.getTextContent()` was then used, reading the form's own
  numbered items (1-30) across all 3 pages in full, with item-22's
  two-column purpose-of-stay checkbox grid specifically re-read by sorting
  each text item's own `x`/`y` transform coordinates (not naive top-to-
  bottom line order, which interleaves the two columns) to correctly
  attribute each of the grid's 11 category labels to its own column/row —
  the same coordinate-adjacency discipline this registry has applied
  elsewhere to two-column checkbox layouts (e.g. `bg/mvr/zayavlenie-za-
  izdavane-na-pasport`'s own extraction).
- **What it confirms:** every field this document models, verbatim,
  including the exact 11-category purpose-of-stay taxonomy in item 22; the
  exact wording of the temporary-residence pre-approval sub-block in item
  21; the exact family-reunification relationship checkbox list in item 28;
  and the exact closing declaration text used in
  `documents[].signatureDeclaration` ("Izjavljujem da su, prema mojem
  najboljem znanju, svi navedeni podaci točni i potpuni...").
- **What it does NOT print:** a closed, enumerable list of Croatia's police
  administrations/stations (item 21's issuing authority) or of countries —
  both are modelled as free text, consistent with this registry's
  established convention of not fabricating an administrative-unit cascade
  the source itself does not enumerate.

### Source 2 (duplicate-detection comparison target)

- `de/auswaertiges-amt/national-visa-application`'s own committed
  `schema.json` (81 fields) and source PDF, both already in this registry
  from a prior cycle; re-read in full this cycle (not re-fetched from
  `auswaertiges-amt.de`, since the committed field list and this registry's
  own prior independent extraction of it were already sufficient to
  identify the divergence — the same "read the committed field list plus
  the prior extraction record" approach `es/maec/solicitud-visado-
  nacional`'s VERIFICATION.md used as its own duplicate-detection baseline
  before additionally re-fetching the PDF itself). See "Why this candidate
  needed a fresh look" above for the full field-by-field comparison this
  produced.

## Field inventory (Phase 2)

All 51 `fields[]` entries and their exact source item number are recorded
inline in `schema.json`'s own `sourceRef` per field. Summary by step:

| Step | Fields | Source items | Notes |
|---|---|---|---|
| `applicant_identity` | 12 | 1-9 | The Schengen-harmonized opening identity block |
| `minor_and_travel_document` | 8 | 10-16 | `guardianDetails` (item 10) left ungated — no separate "is the applicant a minor?" checkbox exists; `nationalIdentificationNumber` (item 11) is Croatia's own applicant-nationality-country ID number, not a Croatian OIB |
| `contact_and_residence` | 8 | 17-20 | `applicantAddressAndEmail` merges postal address and e-mail, matching the source's own single combined box |
| `temporary_residence_approval` | 4 | 21 | All four fields optional (no `requiredWhen` tie exists on the source for this sub-block) |
| `purpose_of_stay` | 5 | 22-26 | `purposeOfStay`, the 11-category taxonomy, is this document's central duplicate-detection finding |
| `prior_visa_history` | 3 | 27 | `priorVisaFingerprintDate`/`priorVisaNumber` left ungated per the source's own "ako je poznat" (if known) hedge |
| `family_reunification` | 8 | 28 | `requiredWhen purposeOfStay == "family-reunification"`, per the item's own printed header; `familyMemberResidencePermitTypeAndNumber` left ungated (conditional on the family member not being a Croatian national, a sub-condition the source does not carry as a separate checkbox) |
| `employer_or_school_in_croatia` | 1 | 29 | Left ungated — no printed conditional header narrows it to a `purposeOfStay` subset, unlike the family-reunification/employer/school blocks on `es/maec/solicitud-visado-nacional`, which do print such headers |
| `accommodation_and_signature` | 2 | 30, closing block | Physical signature itself not modelled, per this registry's standing convention |

Total: **51 fields**, **6 `documents[]` entries**, **2 `crossFieldValidation`**
rules.

## Access notes and judgment calls

1. **The `documents[]` checklist models 5 supporting-evidence/identity-document
   entries plus 1 attestation — narrower than a plausible six-item list
   (photo, travel document, invitation, means-of-transport proof, travel
   health insurance, prior residence/work permit).** The form's own
   page-1 right-margin "Priložena dokumentacija" (attached documentation)
   office-use checklist, independently re-extracted this cycle, lists
   exactly four items: Putna isprava (travel document), Poziv (invitation),
   Prijevozno sredstvo (means of transport), and Putno zdravstveno
   osiguranje (travel health insurance). A fifth, `applicantPhoto`, is
   modelled separately from the distinct "Fotografija" photo box printed at
   the top of page 1 (not part of the office checklist). **No "prior
   residence/work permit" line item appears on the form's own printed
   checklist** — this cycle's own extraction disagrees with that
   assumption, so it is not modelled as a `documents[]` entry, following
   this registry's non-fabrication discipline. The closest analogues on the
   form are item 18's third-country residence-permit fields
   (`residencePermitOrEquivalentDocumentName`/`residencePermitNumber`/
   `residencePermitValidUntil`, already modelled as `requiredWhen`-gated
   `fields[]`, not a document) and item 21's temporary-residence
   pre-approval sub-block (also modelled as `fields[]`) — neither is
   presented on the form as a document to physically attach, so no
   `documents[]` entry was fabricated for either.
2. **All four checklist-derived documents (`travelDocument`,
   `invitationLetter`, `meansOfTransportProof`, `travelHealthInsurance`) are
   modelled as unconditionally `required: true`.** Unlike `es/maec/
   solicitud-visado-nacional`'s own 10-item office checklist (which
   included several narrow/conditional items this registry judged
   confidently optional, e.g. a medical certificate or a diplomatic nota
   verbal), Croatia's own checklist has only these four items and prints no
   caveat distinguishing any of them as conditional — so all four, plus the
   photo, are treated as universally applicable.
3. **`guardianDetails` (item 10) is left `required: false` with no gating
   condition** — the form's own instruction ("u slučaju maloljetnika")
   makes this conditional on the applicant being a minor, but no separate
   checkbox exists to gate on, the same non-fabrication discipline
   `es/maec/solicitud-visado-nacional`'s own `guardianDetails` field
   applied to the identical situation.
4. **`applicantAddressAndEmail` (item 17) merges postal address and e-mail
   address into one field**, because the source itself presents them as a
   single combined free-text box ("17. Adresa i adresa e-pošte podnositelja
   zahtjeva"), not two separate boxes.
5. **`priorVisaFingerprintDate`/`priorVisaNumber` (item 27) are both left
   ungated.** The source's own hedge ("ako je poznat" / "if known")
   qualifies these even when `fingerprintsPreviouslyCollected` is true, so
   no `requiredWhen` tie was fabricated for them.
6. **`familyMemberResidencePermitTypeAndNumber` (item 28) is left
   ungated.** It applies only when the family member in Croatia is not a
   Croatian national — a sub-condition of item 28 the form does not carry
   as its own separate checkbox distinct from `familyReunificationRelationship`.
7. **`employerOrEducationalEstablishmentInCroatia` (item 29) is left
   ungated (`required: false`, no `requiredWhen`).** The printed item
   carries no conditional header narrowing it to a `purposeOfStay` subset
   (unlike `es/maec/solicitud-visado-nacional`'s own employer/company and
   educational-establishment blocks, which do print such headers, e.g. "en
   caso de solicitar un visado de residencia y trabajo/prácticas") — leaving
   it ungated rather than fabricating a gate the source does not state.
8. **`temporaryResidenceApprovalIssuedByPoliceAuthority` (item 21) is
   modelled as free text**, not an enum, since the form does not print a
   closed list of Croatia's police administrations/stations to enumerate.
9. **`crossFieldValidation` models two checks**: `travelDocumentValidUntil`
   after `travelDocumentDateOfIssue` (the same check
   `de/auswaertiges-amt/national-visa-application` and `es/maec/solicitud-
   visado-nacional` both already model), and
   `temporaryResidenceApprovalValidUntil` after
   `temporaryResidenceApprovalValidFrom` (new to this document, modelling
   Croatia's own temporary-residence pre-approval validity window).
10. **Deep administrative-unit cascades and computed fields were excluded
    from v1.0.0 scope**, per the task brief's own guidance: no enumerated
    list of Croatian police administrations/stations, diplomatic missions,
    or countries (all modelled as free text), and no arithmetic/derived
    fields (this form, unlike a tax return, carries none to begin with).
11. **The office-use-only right-margin administrative columns are excluded
    entirely** (application date/number, HVIS reference number, DM/KU
    code, service provider, case handler, visa decision, approved-days/
    entries granted) — filled in by the consulate/mission, not the
    applicant, the same class of exclusion `es/maec/solicitud-visado-
    nacional` applied to its own "PARTE RESERVADA A LA ADMINISTRACIÓN"
    column.

## Test run (Phase 3)

No live submission was attempted: this is a request form against a real
national visa-issuing authority (a Croatian diplomatic/consular mission),
and submitting fabricated identity data into a real government system is
not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and committed under
`conformance/hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d/1.0.0/`:

- **`valid-digital-nomad-remote-worker.json`** — Minh Nguyen, a Vietnamese
  remote software engineer applying under `purposeOfStay:
  "digital-nomad-stay"`, with no third-country residence, no family
  reunification block, and a remote employer abroad. Passes with zero
  errors.
- **`valid-family-reunification-applicant.json`** — Olena Kovalenko, a
  Ukrainian graphic designer applying under `purposeOfStay:
  "family-reunification"` to join her spouse, a Croatian national resident
  in Split. Correctly requires the full `familyReunificationRelationship`…
  `familyMemberAddressPhoneEmail` block via the `requiredWhen` tie. Passes
  with zero errors.

**Five committed mutation/negative controls**, each derived from the
family-reunification packet with exactly one defect introduced (verified
with a standalone, ajv-free rule-tracing Python script — not committed —
that reads `schema.json`'s own `required`/`requiredWhen`/`validation.enum`/
`validation.pattern`/`crossFieldValidation` and evaluates them against each
mock record):

- `mutation-control-missing-required-surname.json` — removes `surname` —
  correctly flagged as one missing required field.
- `mutation-control-invalid-enum-purpose-of-stay.json` — sets
  `purposeOfStay: "tourism"` — correctly flagged as one `validation.enum`
  violation.
- `mutation-control-missing-family-reunification-relationship.json` —
  removes `familyReunificationRelationship` while `purposeOfStay` is
  `"family-reunification"` — correctly flagged as one missing
  `requiredWhen`-gated field.
- `mutation-control-travel-document-valid-before-issue.json` — swaps
  `travelDocumentDateOfIssue`/`travelDocumentValidUntil` so the document is
  valid before it was issued — correctly flagged as one
  `crossFieldValidation` violation.
- `mutation-control-missing-third-country-residence-permit.json` — sets
  `residesInCountryOtherThanNationality: true` with none of
  `residencePermitOrEquivalentDocumentName`/`residencePermitNumber`/
  `residencePermitValidUntil` supplied — correctly flagged as three missing
  `requiredWhen`-gated fields (the same tie fires on all three; the same
  multi-field-cascade outcome `es/maec/solicitud-visado-nacional`'s own
  negative control (e) documented for its analogous
  `residesInCountryOtherThanNationality` check).

All five negative controls were correctly rejected; no defects were found
in the schema itself.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d/1.0.0/schema.json
ok   registry/hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d/1.0.0/schema.json
ok   registry/hr/mvep/zahtjev-za-dugotrajnu-vizu-viza-d/1.0.0/schema.json [v0.3]

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

This document gives Croatia 3 of its 6 verticals (Taxes, Business
Formation, Visa); DMV, Passport, and National ID & Civic Documents remain
confirmed dead ends per GOV-2883's own screening (Croatia's MUP
civil-document processes are uniformly officer/system-mediated at the
counter, with no public blank template distributed) — none should be
re-attempted without a genuinely new source.
