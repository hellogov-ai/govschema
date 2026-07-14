# Verification record — `ro/mae/formular-cerere-viza-de-lunga-sedere` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2837**). Romania
currently has 3 of 6 verticals modelled: Taxes
(`ro/anaf/declaratie-unica-activitati-independente`, GOV-2797, which opened
Romania as the registry's 50th jurisdiction), DMV
(`ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
GOV-2804), and Business Formation
(`ro/onrc/cerere-inregistrare-persoane-juridice`, GOV-2813). This document
adds **Visa**, giving Romania 4 of its 6 verticals. Passport (DGP/MAE) and
National ID & Civic Documents remain open, unscreened-this-cycle backlog.

## Candidate screening this cycle

Three candidates were scouted in parallel: Romania's passport application
(DGP/MAE), Romania's Type-D national visa (MAE), and Bulgaria's DMV
(driving-licence issuance, MVR). All three came back as genuine, well-sourced
candidates. This document was authored from the visa candidate because its
source PDF gave the cleanest extraction (a real text layer across all 4
pages, no scanned-image or non-standard-encoding risk) and because Romania,
already at 3 of 6 verticals, was judged the stronger jurisdiction to advance
further this cycle. Romania's passport application (MAE's "Anexa 10 – Cerere
pentru eliberarea unui nou pașaport," ~30 fields, also Wayback-verified) and
Bulgaria's DMV driving-licence form (MVR's "Приложение № 2а" specimen, ~15-20
fields, needs a proper ToUnicode CMap decode for an exact Cyrillic field
count) are both left as strong, ready-to-author backlog candidates for a
future cycle.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Ministerul Afacerilor Externe (MAE, Ministry of Foreign
  Affairs)
- **Document:** "Formular de cerere pentru viză de lungă ședere" /
  "Application for long-stay visa" (Type D)
- **URL (as cited in `source.url`):**
  <https://www.mae.ro/sites/default/files/file/anul_2018/2018.05.25_formular_cerere_viza_de_lunga_sedere.pdf>
- **Access note:** the live `mae.ro` domain returned HTTP 403/503 to every
  direct fetch attempted this cycle (an anti-bot/WAF gate affecting the
  entire domain, not evidence the document itself is gone — the same file is
  still indexed by search engines under its own title). The document was
  instead retrieved from the Internet Archive's Wayback Machine, which holds
  two independent snapshots of the exact same URL:
  - `20220302110748` (via `http://www.mae.ro/...`)
  - `20220709071246` (via `http://mae.ro/...`, no `www`)

  Both snapshots share the identical Wayback CDX digest
  (`QJ742S66OMAFJQNF77OP7RNZLT3JQXF3`). This cycle independently re-fetched
  the file via two different Wayback access patterns — the `if_`
  (iframe-free) rendering of the `20220305162016` capture, and the `id_`
  (raw identical) rendering of the `20220302110748` capture — and both
  produced byte-identical files: 549,937 bytes,
  sha256 `863662c12000c79e47c1358020377167b8fb8c46012893d4ebe36b9576c1f398`.
  This cross-method, cross-timestamp match is treated as strong evidence the
  archived copy is a faithful, unaltered mirror of the live 2018-05-25
  edition, not a Wayback-side artifact.
- **Extraction method:** `pdfjs-dist@3.11.174` (`build/pdf.js`, CommonJS
  entrypoint — this environment's copy predates the `legacy/build/pdf.mjs`
  layout used in some prior cycles). `getAnnotations()` was run against all
  4 pages: it returned zero `Widget` annotations across the entire document
  (only `Link` annotations, e.g. `mailto:dpo@mae.ro`, on pages 3-4) —
  confirming this is a flat, non-interactive specimen (filled by hand or on
  a typewriter), the same tier as the majority of this registry's sources.
  `getTextContent()` was extracted per page and grouped into rows by
  rounded y-coordinate, each row's items sorted by x-coordinate, giving a
  faithful top-to-bottom, left-to-right reading order for every printed
  line without relying on the PDF's own internal content-stream ordering.
  This reproduced all 46 numbered items on the form (1 through 46) with
  their full bilingual Romanian/English labels, cross-checked visually
  against the row dump.
- **Not modelled — the "FOR EMBASSY / CONSULATE USE ONLY" column.** Page 1's
  right-hand margin (headed "FOR EMBASSY / CONSULATE USE ONLY," rows
  541-88) carries "Data solicitării" (a consulate-stamped application date)
  and a "Documente doveditoare" (supporting documents) checklist alongside a
  set of "Nr./data aviz ..." (approval-notice number/date) fields for
  investment, studies, employment, secondment, Ministry-of-Culture cultural
  activity, and family-reunification purposes — these are consulate-facing
  tracking fields and IGI (Inspectoratul General pentru Imigrări)
  case-reference numbers issued through a separate procedure, not
  applicant-supplied data, the same class of exclusion this registry
  already applies to Spain's "PARTE RESERVADA A LA ADMINISTRACIÓN" column
  (see `es/maec/solicitud-visado-nacional`'s own VERIFICATION.md). The
  checklist's document *categories*, however, are genuinely informative
  about what the applicant must supply, so they are captured in
  `documents[]` instead (see Judgment call 2 below). Page 2's "Viza:
  Refuzată/Acordată" (visa: refused/granted) marker is likewise excluded as
  a decision the consulate records, not applicant input.

### Source 2 (duplicate-detection comparison targets)

- `de/auswaertiges-amt/national-visa-application`'s own committed
  `schema.json` (81 fields) and `es/maec/solicitud-visado-nacional`'s own
  committed `schema.json` (60 fields) were both read in full and compared
  against this form's own 46 numbered items.

  **Finding: this is a genuine, distinct national form, not a
  republication of either.** All three forms share the same
  Schengen-harmonized opening identity block (surname, surname at birth,
  first names, date/place/country of birth, nationality, sex, marital
  status) — the same shared-boilerplate convention this registry has
  already documented across multiple EU member states' national-visa forms
  (see `es/maec`'s own VERIFICATION.md, which cites the Czech and German
  forms for the same pattern). Past that block, Romania's form diverges
  from both:
  - Neither Germany's nor Spain's form has Romania's own 10-category
    purpose-of-journey taxonomy tied specifically to Romania's own D-visa
    subtypes (D/AE, D/VF, D/AP, D/SD, D/AC, D/AS, D/AR, D/AM, D/CS, D/DT —
    printed directly on the form as such), nor Romania's distinct
    "personal data of the Romanian national you depend on" block (item 40),
    a scenario neither other form models.
  - Germany's form has an unconditional parents section (father *and*
    mother, each with DOB/place-of-birth/nationality/residence) and a
    criminal-conviction/notifiable-disease disclosure block; Romania's form
    has neither — only the father's/mother's *names* (items 11-12, no DOB
    or nationality), a materially thinner ask.
  - Spain's form has its own three purpose-conditional blocks (sponsor,
    employer, educational establishment) with structured multi-field
    detail; Romania's form instead asks free-text "state whom and how" for
    its cost-bearer question (item 32) and a single combined
    employer/school line (item 20) — Romania's form is structurally
    simpler on this axis.
  - Romania's own host-in-Romania block (item 31: name, phone/fax, address,
    email) and its bounded 3-row children table (item 39) have no exact
    counterpart in either other form's field set.

  Net: shared opening block only, genuinely distinct past it in both
  directions (Germany and Spain each have content absent from Romania's
  form, and Romania has content absent from both). Authored as a new,
  non-duplicate schema.

## Field inventory (Phase 3)

All 65 `fields[]` entries and their exact source item number are recorded
inline in `schema.json`'s own `sourceRef` per field. Summary by step:

| Step | Fields | Source items | Notes |
|---|---|---|---|
| `applicant_identity` | 13 | 1-12 | Schengen-harmonized opening identity block |
| `travel_document` | 6 | 13-17 | `travelDocumentType` modelled as one enum from 6 independent checkbox options |
| `residence_and_occupation` | 4 | 18-20 | `residesInCountryOtherThanNationality` left optional — see Judgment call 1 |
| `journey_and_visa_details` | 4 | 22-25 | Item 21 ("main destination"/pre-printed "Tipul de viză: D") not modelled — see "What is NOT modelled" |
| `purpose_and_travel_plan` | 9 | 26-31 | `purposeOfJourney`, Romania's own 10-option D-visa taxonomy |
| `financial_support` | 5 | 32-33 | `meansOfSupport` modelled as one enum from 5 independent checkbox options |
| `spouse_and_family` | 20 | 34-41 | Bounded 3-row children table (`child1Name`…`child3DateOfBirth`); dependent-Romanian-citizen block |
| `consent_and_contact` | 4 | 42-45 | `gdprConsentAcknowledged` collapses the long declaration text (pages 3-4) into one boolean |

Total: **65 fields**, **8 `documents[]` entries**, **2
`crossFieldValidation`** rules, **8 `steps`**.

## Access notes and judgment calls

1. **`residesInCountryOtherThanNationality` (item 18) is left optional with
   no gating condition.** The printed question ("If you reside in a
   country other than your country of origin, do you have the permission
   to return to that country?") only makes sense for an applicant who does
   in fact reside abroad, but the form has no separate checkbox
   establishing that antecedent fact — modelling a fabricated gate would
   assert a condition the source itself does not state as a checkable
   field, the same non-fabrication discipline `es/maec` applied to its own
   `guardianDetails` field.
2. **`documents[]` derives from the "Documente doveditoare" (supporting
   documents) checklist** printed in the office-use column, the same
   pattern `es/maec` used for its own "documents received" checklist. Five
   entries map to universal, unconditional requirements
   (`applicantPhoto`, `travelDocument`, `proofOfFinancialMeans`,
   `travelHealthInsuranceProof`, `accommodationProof`); `invitationLetter`
   and `returnTravelTicket` are
   modelled as optional (the checklist does not state a universal trigger
   for either); and the several "Nr./data aviz ..." entries (investment,
   studies, employment, secondment, Ministry of Culture, family
   reunification) are consolidated into one `igiApprovalNotice` document,
   gated `requiredWhen purposeOfJourney` is one of the values the
   checklist's own aviz rows correspond to (economic activities,
   employment, secondment, studies, family reunification, professional
   activities) — the "Ministry of Culture" and generic "other purposes"
   aviz rows were judged too narrow/ambiguous for a v1.0.0 mapping and are
   not separately modelled.
3. **`gdprConsentAcknowledged` (item 42) collapses roughly a full page and a
   half of declaration text** (spanning the end of page 3 through most of
   page 4 — GDPR processing consent, data-accuracy declaration, and
   false-data/visa-overstay acknowledgements) **into a single required
   boolean**, consistent with how this registry has treated comparably
   long consent/declaration blocks elsewhere (e.g. the dedicated consent
   schemas already in this registry). Splitting each individual
   acknowledgement sentence into its own field would not correspond to any
   separate printed checkbox or signature line on the source.
4. **The physical signature itself (item 46) is not modelled**, per this
   registry's standing convention (applies equally to the parenthetical
   "for minors, signature of legal representative/guardian" variant).
5. **`placeAndDateOfApplication` (item 45) is modelled as one combined
   string field**, matching the source's own single printed line ("Dată la
   (locul şi data)") rather than splitting place and date into two boxes
   the form does not itself separate.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national visa-issuing authority, and submitting fabricated identity data
into a real government system is not a safe or reversible action.

Instead, a fully hand-constructed mock record was built from this
document's own field inventory
(`conformance/ro/mae/formular-cerere-viza-de-lunga-sedere/1.0.0/application-packet.json`)
and independently checked with a standalone, ajv-free rule-tracing script
(not committed — reads `schema.json`'s own `required`/`requiredWhen`/
`validation.pattern`/`validation.enum`/`validation.minimum`/`validation.maximum`/
`crossFieldValidation` and evaluates them against the mock record), in
addition to the repo's own validators.

**Committed scenario — Amara Chukwu, a Nigerian software engineer applying
for a long-stay employment visa, sponsored by a Romanian tech company that
also serves as her host.** `purposeOfJourney: "employment"` and
`costBearer: "host-company"` together correctly require
`hostCompanyOrPersonDetails` (via the `requiredWhen` tie on `costBearer`)
and the conditional `igiApprovalNotice` document (via the `requiredWhen` tie
on `purposeOfJourney`), while leaving the spouse/children/dependent fields
absent (single applicant, `maritalStatus: "single"`). Passes with zero
errors.

**Two further scenarios (traced only, not committed as separate fixture
files):** (1) a married applicant with `maritalStatus: "married"` and no
`spouseFamilyName`/`spouseFirstName` supplied — correctly flagged as two
missing required fields via the `requiredWhen` tie on `maritalStatus`. (2)
`dateOfDeparture` set earlier than `dateOfArrival` — correctly flagged as a
`crossFieldValidation` violation.

**Four negative controls** (each expected to fail exactly one rule, run
against the committed employment-visa packet): (a) removing
`hostCompanyOrPersonDetails` while `costBearer` is `"host-company"` —
correctly flagged as a missing required field; (b) setting
`purposeOfJourney: "tourism"` — correctly flagged as a `validation.enum`
violation (not a value in the closed 10-option taxonomy); (c) swapping
`travelDocumentDateOfIssue`/`travelDocumentValidUntil` so the document is
valid before it was issued — correctly flagged as a `crossFieldValidation`
violation; (d) `durationOfStayDays: 400` — correctly flagged as a
`validation.maximum` violation. All four negative controls were correctly
rejected; no defects were found in the schema itself.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ro/mae/formular-cerere-viza-de-lunga-sedere/1.0.0/schema.json
ok   registry/ro/mae/formular-cerere-viza-de-lunga-sedere/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ro/mae/formular-cerere-viza-de-lunga-sedere/1.0.0/schema.json
ok   registry/ro/mae/formular-cerere-viza-de-lunga-sedere/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- Romania's own Schengen (Type C) short-stay visa form — not screened this
  cycle (not needed: Romania's D-visa candidate was strong enough on its
  own merits, and a same-template short-stay form would very likely
  duplicate the already-modelled Schengen-harmonized template, consistent
  with the pattern established for Poland, Portugal, Czechia, Spain, and
  Switzerland's own short-stay forms).
- The "FOR EMBASSY / CONSULATE USE ONLY" column (application date, case
  handler, decision, aviz reference numbers) — office-use-only, not
  applicant-facing (see the Access notes above).
- Item 21's pre-printed "Tipul de viză: D" — this is fixed context for the
  entire document (it *is* the Type-D form), not applicant input; its
  companion "Viza: Refuzată/Acordată" marker is the consulate's own
  decision record.
- The physical signature itself (item 46's second half) — per this
  registry's standing convention.
- Any purpose-specific supplementary document the IGI or a consulate may
  request in addition to this base form (e.g. an employer's own
  economic-activity plan, or a university's own admission letter) beyond
  the general `igiApprovalNotice` document entry.

## Scope and jurisdiction notes

This document gives Romania 4 of its 6 verticals (Taxes, DMV, Business
Formation, Visa); Passport and National ID & Civic Documents remain open,
unscreened-this-cycle backlog candidates for a future cycle.
