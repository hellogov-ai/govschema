# Verification record — `it/maeci/domanda-di-visto-nazionale-d` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is a `GovSchema Standard Research` cycle (**GOV-3032**), opening
**Italy's Visa vertical (1 of 6)**. A prior scouting pass had flagged this
form as a candidate but explicitly required a rigorous field-by-field
reconciliation against the registry's existing EU-harmonized long-stay-visa
siblings before authoring, "even if the answer here is not a duplicate" —
per this registry's established precedent of overturning prior
"duplicate"/dead-end findings only after an actual side-by-side content diff
(see `es/maec/solicitud-visado-nacional`'s own GOV-1861 reversal, and
`hr/mvep/zahtjev-za-dugotrajnu-vizu`'s own GOV-2902 reversal, both cited in
the issue brief). This cycle performed that reconciliation from scratch (see
below) and **found this is not a duplicate** — the form carries genuine,
Italy-specific structural content none of the siblings carry, while omitting
entire question categories (spouse, children, parents, criminal-conviction
disclosure, notifiable disease) those siblings do carry. Authored as a new
schema on that finding.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Ministero degli Affari Esteri e della Cooperazione
  Internazionale (MAECI).
- **Document:** "National Visa Application (D)" / "Domanda di visto
  nazionale (D)", bilingual English/Italian.
- **URL:** `https://www.esteri.it/mae/Servizi/Stranieri/Formulario_Visto_Nazionale_ING-ITA.pdf`
- **Fetched this cycle:** `curl -sL` with a standard desktop browser
  User-Agent, unauthenticated, no login/CAPTCHA/WAF gate encountered.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `283,335` bytes (independently confirmed via `curl -D` response headers and
  cross-checked with `ls -la`/`wc -c`).
- **sha256 (independently computed this cycle with `sha256sum`, not trusted
  from the prior scouting pass that cited the same value):**
  `eba970bc7eebfde7ed96f61a428172017e31b8586e6dd5effafe35ec41aa4dee`.
  **This matches the prior scouting pass's claimed value exactly** — both
  now independently agree, and this cycle did not simply repeat the claim
  without re-deriving it.
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js`
  (CommonJS `require`, this registry's established technique for this
  environment — no `pdftotext`/`pdftoppm`/`pip` available). `doc.getFieldObjects()`
  returned `null` and `page.getAnnotations()` returned **zero** `Widget`
  annotations on pages 1 and 2 (only 6 unrelated annotations — non-Widget —
  on page 3), confirming a static hand-fill/print template, not a fillable
  AcroForm PDF, the same class as `hr/mvep/zahtjev-za-dugotrajnu-vizu`.
  `page.getTextContent()` was used instead, reading every numbered item's
  printed text across all 3 pages, in full, independently of the prior
  scouting pass's own item list.
- **What it confirms:** the form's own 32 numbered items (1-32) and their
  exact bilingual labels, including the full 11-option purpose-of-journey
  checkbox grid (item 20), the two-sided travel-funding block (item 28), the
  "personal data of the family member who is an EU, EEA or CH citizen"
  block (item 29) and its own family-relationship taxonomy (item 30), the
  free-of-charge notice ("This application form is free" / "Modulo
  gratuito"), and page 3's closing declaration text citing Article 331 of
  the Code of Criminal Procedure and the Garante per la Protezione dei Dati
  Personali by name and address.
- **Retrieved / reviewed:** 2026-07-15.

### Sources 2-5 (duplicate-detection comparison targets)

Each of the following was read in full (`schema.json` and `VERIFICATION.md`)
this cycle before authoring:

- `de/auswaertiges-amt/national-visa-application` (Germany) — 81 fields
  across 16 labelled sections (identity, travel document, spouse, children,
  parents, previous stays in Germany, intended stay/accommodation type,
  permanent residence abroad, accompanying family, purpose of stay,
  references, profession, duration, means of subsistence/health insurance,
  criminal convictions, expulsion/refusal history, notifiable disease).
- `bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d` (Bulgaria) —
  spouse block, a 4-child repeating table (child1..child4, each with
  name/DOB-place/nationality/address), a guardian field, and a 3-entry
  previous-stays-in-Bulgaria repeating block.
- `es/maec/solicitud-visado-nacional` (Spain) — 60 fields, a 12-category
  residence-purpose taxonomy, and three purpose-conditional blocks
  (family-reunification sponsor, employer/company, educational
  establishment).
- `hr/mvep/zahtjev-za-dugotrajnu-vizu` (Croatia) — 50 fields, a two-step
  temporary-residence/visa construct (a pre-approval sub-block naming the
  approving police authority), an 11-category purpose-of-stay taxonomy
  (digital nomad, EEA long-term-resident stay, posted-worker employment),
  and a named family-reunification-sponsor sub-block.

`fr/france-visas/schengen-visa-application`'s own `travelCostsFundedBy`/
`applicantMeansOfSubsistence`/`sponsorMeansOfSubsistence` fields were also
read (not a long-stay-visa sibling, but the closest precedent in this
registry for modelling the exact EU Annex-I-style two-sided funding block
that reappears, in near-identical shape, as this form's own item 28 — see
Judgment call 4 below).

## Independent re-extraction detail

```
numPages: 3
getFieldObjects: null
page 1: annotations=0 widgets=0
page 2: annotations=0 widgets=0
page 3: annotations=6 widgets=0
```

Zero Widget annotations confirms this is a static print/hand-fill template
(the same class as `hr/mvep/zahtjev-za-dugotrajnu-vizu`), not a fillable
AcroForm. `getTextContent()` produced clean, ordered per-page text with no
image-only/scanned-page fallback needed.

## Field-by-field reconciliation (mandatory per this cycle's brief)

| Item # (this form) | Label | `de/auswaertiges-amt` | `bg/mvnr` | `es/maec` | `hr/mvep` | Verdict |
|---|---|---|---|---|---|---|
| 1-3 | Surname, surname at birth, first names | Same fields (Section 1) | Same fields | Same fields (items 1-3) | Same fields (rubrike 1-3) | IDENTICAL (shared Schengen-harmonized identity boilerplate) |
| 4-6 | Date/place/country of birth | Same | Same | Same (items 4-6) | Same (rubrike 4-6) | IDENTICAL (shared boilerplate) |
| 7 | Current nationality + at-birth-if-different | Same | Same (+ "other nationality"/"previous nationalities" split into 2 extra fields) | Same (item 7) | Same (rubrika 7) | IDENTICAL (shared boilerplate) |
| 8 | Gender | Same | Same | Same (item 8) | Same (rubrika 8) | IDENTICAL |
| 9 | Marital status (6 values: single/married/separated/divorced/widowed/other) | 5-value list, no separate "Separated" | 7-value list (adds "registered partnership") | 7-value list (adds "registered union") | 7-value list (adds "life partnership") | SIMILAR-BUT-DIFFERENT (this form is the only sibling with no registered-partnership/civil-union category) |
| 10 | Minors: guardian details | No counterpart (DE's Section 2/3 model spouse/children, not a guardian-for-minors field) | Present (`guardianDetails`) | Present (`guardianDetails`, item 10) | Present (`parentalRightsOrLegalRepresentativeDetails`, rubrika 10) | IDENTICAL concept, shared boilerplate |
| — | Spouse block (full name/DOB/nationality/residence) | Present, 9 fields (Section 2) | Present, 7 fields | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — this form has **no spouse section at all** |
| — | Children block (repeating) | Present (`childrenCount`/`childrenDetails`) | Present, 4-slot repeating table (child1..child4) | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no children section at all |
| — | Parents (father/mother) block | Present, unconditional (Section 4) | **Absent** | **Absent** | **Absent** | (DE-only content; not relevant to IT's own distinguishing content, listed for completeness) |
| — | Previous stays in the destination country | Present, up to 5 (Section 5) | Present, 3-entry repeating block | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no previous-stays block |
| 11 | Type of travel document (5 categories + other) | Same shape | Same shape | Same shape (item 12) | Same shape (rubrika 12) | IDENTICAL (shared boilerplate) |
| 12-15 | Travel document number/issue/valid-until/issued-by | Same | Same | Same (items 13-16) | Same (rubrike 13-16) | IDENTICAL (shared boilerplate) |
| 16 | Address + email + phone (combined box) | Split into `currentAddressStreet`/`currentAddressPostcodePlace`/`email`/`phone`/`mobilePhone` | Split similarly | Combined into one box (item 17), same as this form | Split (rubrika 17: address+email combined, phone separate) | SIMILAR-BUT-DIFFERENT (whether address/email are one combined box or split varies by sibling; this form matches ES's combined-box treatment) |
| 17 | Residence in a third country + permit sub-block | No counterpart (Germany's own form is the entry document itself) | Present (`residesInCountryOtherThanNationality` + permit fields) | Present (item 18) | Present (rubrika 18) | IDENTICAL concept, shared boilerplate |
| 18-19 | Current occupation + employer/institute details | Present (Sections 10-11, split across "references" and "profession") | Present (`currentProfession`/`employerOrSchoolDetails`) | Present (item 19, `currentOccupation` only — no employer field) | Present (rubrike 19-20) | SIMILAR-BUT-DIFFERENT (ES has no employer-details field at all; this form does) |
| — | Accommodation type (single room/apartment/collective) | Present (Section 6) | **Absent** | **Absent** | **Absent** | (DE-only content, listed for completeness) |
| — | Permanent residence maintained abroad | Present (Section 7) | **Absent** | **Absent** | **Absent** | (DE-only content) |
| — | Family members accompanying | Present (Section 8) | Present (`familyMembersTravelingTogether`/`familyMembersDetails`) | **Absent** | **Absent** | (not this form's own content) |
| 20 | Purpose of journey, 11 categories: family reunification, religious reasons, sport, mission, diplomatic, medical reasons, study, adoption, salaried employment, self-employment, other | 6 categories (Employment/Study/Au pair/Language course/Family reunion/Other) — **no** Adoption/Mission/Diplomatic/Religious-reasons/Sport | Different, residence/work-permit-oriented set (residence w/o work, employment types, seasonal work) | 12 categories (residence w/o work, family reunification, employment types, investor/entrepreneur, study, internship, research, residence recovery, accreditation, other) — **no** Adoption/Mission/Diplomatic/Religious-reasons/Sport | 11 categories (family reunification, employment, secondary education, posted-worker, studying, EEA-long-term-resident, research, digital nomad, humanitarian, other, life partnership) — **no** Adoption/Mission/Diplomatic/Religious-reasons/Sport | IT-SPECIFIC-NO-EQUIVALENT — no sibling's taxonomy contains Adoption, Mission, Diplomatic, Religious-reasons, or Sport as a purpose category; this form's taxonomy is oriented around consular-service categories rather than any sibling's residence/work-permit framing |
| 21 | Destination in Italy | Present as `intendedStayStreet`/`intendedStayPostcodePlace` (Section 6) | Present (`intendedPlaceOfStayInBulgaria`) | Present (`addressInSpain`, item 23) | Present (`intendedAccommodationAddressInCroatia`, rubrika 30) | IDENTICAL concept, shared boilerplate |
| 22 | Schengen State of first entry (if applicable) | **Absent** | **Absent** | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no sibling asks this |
| 23 | Number of entries requested (1/2/multiple) | **Absent** (Germany's national visa does not ask this on the paper form) | **Absent** | Present (item 22, same 3-value shape) | Present (`numberOfEntriesRequested`, rubrika 24, 2-value: single/multiple) | SIMILAR-BUT-DIFFERENT (shared with ES specifically, not DE/BG/HR as a group) |
| 24 | Number of days of intended stay (max. 365), numeric | **Absent** (DE instead asks `intendedDurationFrom`/`intendedDurationTo` as a date range) | **Absent** (BG instead asks `plannedStayFrom`/`plannedStayTo`) | **Absent** (ES has no explicit day-count/duration field at all) | **Absent** (HR has no explicit day-count field either) | IT-SPECIFIC-NO-EQUIVALENT — this form is the only sibling with an explicit numeric day-count cap rather than a date range |
| 25 | Intended date of arrival in Schengen area | Present, similar (`intendedDurationFrom`) | Present (`plannedArrivalDate`) | Present (`intendedDateOfArrival`, item 21) | Present (`intendedArrivalDate`, rubrika 25) | IDENTICAL concept, shared boilerplate |
| 26 | Family-reunification/employer-in-Italy contact block (name, address in Italy for other purposes, address/email, phone/fax) | No direct counterpart in this combined shape (DE's Section 10 "references" is generic and optional, not purpose-gated) | No direct counterpart in this combined shape | Present in a different shape: a full named-sponsor sub-block with the sponsor's own DOB/nationality/travel-document number (item 26) | Present in a different shape: a full named-sponsor sub-block with the sponsor's own DOB/nationality/permit-type (rubrika 28) | SIMILAR-BUT-DIFFERENT — this form's own item 26 is a lighter-weight contact block (name/address/phone/fax only, no sponsor DOB/nationality/document-number fields), materially thinner than ES's/HR's own sponsor sub-blocks |
| 27 | Host company/organization block (name/address, phone/fax, contact person) | No direct counterpart (DE's Section 10 references are generic, not company-specific) | No direct counterpart | No direct counterpart (ES's item 27 employer block is purpose-gated on employment categories, not framed as "host company/organization" generally) | No direct counterpart (HR's rubrika 29 employer/school field is purpose-agnostic but a single combined line, not a 3-field company block) | SIMILAR-BUT-DIFFERENT — closest in spirit to ES's item 27 employer block, but framed generally as "host Company/Organization" rather than gated to employment-purpose values only |
| 28 | Two-sided travel-funding block: who pays (applicant/sponsor/other) + a distinct means-of-support checklist for each side | No counterpart at all (DE's own Section 13 "means of subsistence" is a single free-text-style field, not this two-sided applicant-vs-sponsor structure) | No counterpart | No counterpart in this combined shape (ES has no "who pays" + means-of-support checklist structure at all) | No counterpart | IT-SPECIFIC-NO-EQUIVALENT among the D-visa siblings — but this exact structure (who-pays enum + per-side means-of-support checklist) **is** the EU Regulation 810/2009 Annex I harmonized funding block already modelled for the Schengen (Type C) short-stay visa in `fr/france-visas/schengen-visa-application`'s own `travelCostsFundedBy`/`applicantMeansOfSubsistence`/`sponsorMeansOfSubsistence` fields — disclosed honestly as shared Schengen-Annex boilerplate re-used inside a national D-visa form, not evidence this whole document duplicates `fr/france-visas` (see "Why this is not a duplicate of `fr/france-visas`" below) |
| 29-30 | Personal data of the family member who is an EU, EEA or CH citizen + family-relationship taxonomy (spouse/son-daughter/other descendant/dependent ascendant/other) | **Absent** | **Absent** | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no sibling long-stay-visa template already modelled in this registry carries an EU/EEA/CH-free-movement-family-member block at all |
| — | Criminal-conviction disclosure (Germany/abroad, when/where/reason/nature) | Present (Section 14) | **Absent** | **Absent** | **Absent** | (DE-only content; IT's own closing declaration instead cites Article 331 c.p.p. as a *consequence* of false statements, not a disclosure *question* — see "Article 331 c.p.p. clause" below) |
| — | Notifiable-disease disclosure | Present (Section 16) | **Absent** | **Absent** | **Absent** | (DE-only content) |
| — | Expelled/deported/refused-entry history | Present (Section 15) | **Absent** | **Absent** | **Absent** | (DE-only content) |
| 31 | Place and date of signing | Present | Present | Present (item 30) | (no distinct field; HR's own signature line is part of its declaration block) | IDENTICAL concept, shared boilerplate |
| — | Article 331 c.p.p. criminal-referral clause (false statements → prosecution under Italian criminal procedure law) | **Absent** | **Absent** | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no sibling's declaration text cites a criminal-procedure-code referral by article number |
| — | Garante per la Protezione dei Dati Personali citation (Italy's data-protection supervisory authority, named with address/phone) | **Absent** | **Absent** | **Absent** | **Absent** | IT-SPECIFIC-NO-EQUIVALENT — no sibling's data-protection notice names a specific national supervisory authority by name/address/phone in this way |

**Conclusion: NOT a duplicate.** This form omits, in its entirety, four
structural blocks that Germany's and/or Bulgaria's forms both carry (spouse,
children, previous-stays, accommodation-type), omits three disclosure
categories Germany's form alone carries (criminal convictions, notifiable
disease, expulsion history), and adds five items/blocks with no counterpart
on any of the four already-modelled long-stay-visa siblings: the
Schengen-first-entry-state field (item 22), the numeric 365-day cap (item
24), the two-sided applicant/sponsor funding-and-means-of-support block
(item 28), the EU/EEA/CH family-member data-and-relationship block (items
29-30), and the closing declaration's Article 331 c.p.p. criminal-referral
clause plus its Garante per la Protezione dei Dati Personali citation. This
is a genuinely distinct national form sharing only the expected
Schengen-harmonized opening identity/travel-document boilerplate (items
1-16) with its siblings — the same kind of shared convergence this
registry already treats as expected, not evidence of duplication (see the ES
and HR precedents cited above).

### Why this is not a duplicate of `fr/france-visas/schengen-visa-application`

Item 28's own two-sided funding structure (who pays + a distinct
means-of-support checklist per side) is, on its own, the same EU Regulation
810/2009 Annex I harmonized block already modelled for France's Schengen
(Type C) short-stay visa. That overlap is disclosed honestly above rather
than ignored. But `fr/france-visas` models an entirely different type of
visa (Schengen short-stay, Type C) with an entirely different overall field
set (no purpose-of-journey taxonomy resembling this form's own 11
categories, no travel-document/marital-status opening block in the same
shape, no minors'-guardian field, no EU/EEA/CH family-member block at all —
that specific block does not exist on the Schengen form either). One shared
sub-block embedded inside two otherwise-unrelated forms is the same kind of
ordinary convergence already documented for Sections 1-16's shared identity
boilerplate across every sibling in this table; it is not evidence that this
document, taken as a whole, is a duplicate of `fr/france-visas` or of any
other document in this registry.

## Field inventory (Phase 3)

All 53 `fields[]` entries and their exact source item number are recorded
inline in `schema.json`'s own `sourceRef` per field. Summary by step:

| Step | Fields | Source items | Notes |
|---|---|---|---|
| `applicant_identity` | 11 | 1-9 | Shared Schengen-harmonized opening identity block |
| `minors_and_travel_document` | 7 | 10-15 | `guardianDetails` (item 10) left ungated — see Judgment call 1 |
| `contact_and_residence` | 8 | 16-19 | `applicantAddressAndEmail` combines address+email into one field, matching the source's own single combined box |
| `journey_details` | 7 | 20-25 | `purposeOfJourney`, Italy's own 11-category consular-service taxonomy; `numberOfDaysOfIntendedStay` is a numeric cap (max 365), unique among siblings |
| `family_reunification_or_employer_contact` | 4 | 26 | Gated via `requiredWhen purposeOfJourney in [...]`, split by the item's own two printed conditions (family-reunification/employer vs. adoption/religious/medical/sport/study/mission) — see Judgment call 2 |
| `host_company_or_organization` | 3 | 27 | Left ungated — see Judgment call 3 |
| `travel_funding` | 5 | 28 | Two-sided funding block, following `fr/france-visas`'s own comma-separated-string means-of-subsistence precedent — see Judgment call 4 |
| `eu_eea_ch_family_member` | 7 | 29-30 | Left ungated — see Judgment call 5 |
| `signature` | 1 | 31 | Physical signature itself (item 32) not modelled, per this registry's standing convention |

Total: **53 fields**, **8 `documents[]` entries**, **1 `crossFieldValidation`**
rule (23 fields unconditionally `required: true`; 16 further fields
conditionally required via `requiredWhen`).

## Access notes and judgment calls

1. **`guardianDetails` (item 10) is left `required: false` with no gating
   condition.** The form's own instruction ("In case of minors...") makes
   this conditional on the applicant being a minor, but no separate "is the
   applicant a minor?" field or checkbox exists on the form to gate on —
   the same non-fabrication treatment `es/maec` and `hr/mvep` both already
   apply to their own equivalent fields.
2. **Item 26's four sub-fields are split into two `requiredWhen` gates
   matching the item's own two printed conditions.** The item's first line
   ("Surname and name of the person in Italy who applied for Family
   Reunification, or ... the Employer in Italy") is gated on
   `purposeOfJourney` being family-reunification or one of the two
   employment values; the item's second line ("For Adoption, Religious
   Reasons, Medical Reasons, Sport, Study, Mission, please specify the
   address in Italy") is gated on the complementary purpose values the
   source itself lists by name. The address/email and phone/fax sub-fields
   are gated the same way as the first line, since they are printed as a
   continuation of the family-reunification/employer contact, not the
   address-in-Italy line.
3. **Item 27 (host Company/Organization) is left entirely ungated.** The
   form prints no explicit boolean or purpose condition distinct from item
   26's own conditions for this item, so it is left unconditionally
   optional rather than fabricating a gate — the same treatment
   `hr/mvep` applies to its own `employerOrEducationalEstablishmentInCroatia`
   field.
4. **Item 28's means-of-support checklists are modelled as comma-separated
   strings (`applicantMeansOfSupport`/`sponsorMeansOfSupport`), not as
   individual boolean fields with an `exclusivityGroups` entry.** This
   follows `fr/france-visas/schengen-visa-application`'s own precedent for
   the identical EU Annex-I-style funding block ("multi-select-as-string
   treatment, pending GSP-0009"), since a real applicant could plausibly
   select more than one means of support simultaneously (e.g. both cash and
   a credit card) — unlike the form's other checkbox groups (`maritalStatus`,
   `travelDocumentType`, `purposeOfJourney`, `numberOfEntriesRequested`,
   `familyRelationToEuEeaChCitizen`), each of which is genuinely a single
   mutually-exclusive choice and is modelled as a single `enum`, following
   `es/maec`'s and `hr/mvep`'s own established convention for that widget
   class.
5. **The entire EU/EEA/CH family-member block (items 29-30) is left
   unconditionally optional with no gating field.** The form prints no
   separate "are you a family member of an EU/EEA/CH citizen?" boolean
   distinct from filling in items 29-30 themselves — the same
   non-fabrication principle applied throughout this document and its
   siblings.
6. **`travelCostsCoveredBy` (item 28's own "who pays" question) is gated via
   `requiredWhen purposeOfJourney in [religious-reasons, sport,
   medical-reasons, study, other]`** — the complementary set to the form's
   own printed exclusion list ("THIS INFORMATION IS NOT NECESSARY FOR THE
   FOLLOWING TYPES OF VISA: Family Reunification, Following Family Member,
   Salaried Employment, Self Employment, Mission, Diplomatic, Adoption").
   This is a disclosed logical inversion of the source's own stated
   negative condition into the `in`-operator grammar this registry's
   `Condition` type supports (no `notIn` operator exists in spec v0.3) —
   not a fabricated condition, since it is derived directly from the source's
   own explicit text.
7. **`documents[]` derives from the page-1 "Spazio riservato
   all'Amministrazione" (For Office use only) column's own
   "Documenti giustificativi" (supporting documents) checklist.** Of its six
   checkbox items (travel document; means of subsistence; invitation; means
   of transport; travel health insurance; other), three map to universal,
   unconditional entries this cycle judged confidently required for every
   application (`travelDocumentCopy`, `subsistenceMeansProof`,
   `travelHealthInsuranceProof`), and two (`invitationProof`,
   `meansOfTransportProof`) map to entries this cycle could not confirm a
   universal trigger for and so modelled as optional — the checklist itself
   does not state which `purposeOfJourney` value(s) make each mandatory,
   the same disclosed-scope treatment `es/maec` applies to its own
   comparable checklist-derived entries.
8. **No fee/payment document is modelled.** The form's own header states
   "This application form is free" / "Modulo gratuito" — no payment
   category applies.
9. **Two attestation documents, not one, are modelled** — a shorter
   fee-non-refundability acknowledgement printed at the bottom of page 2
   (immediately above the first signature line) and the longer page-3
   declaration (data-protection notice, Article 331 c.p.p. criminal-referral
   clause, and Garante per la Protezione dei Dati Personali citation, above
   the second signature line). The form itself prints two separate
   signature blocks with two distinct attestation texts, so they are kept
   as two separate `documents[]` entries rather than merged into one.
10. **The page-1 "Spazio riservato all'Amministrazione" (For Office use
    only) column is excluded from `fields[]` entirely** (application date,
    application number, receiving mission/service provider, case handler,
    the visa decision, validity dates, entries/days granted) — the same
    class of exclusion this registry applies elsewhere to internal-marker or
    office-use-only widgets (e.g. `es/maec`'s and `hr/mvep`'s own excluded
    "reserved for administration" columns). The "Documenti giustificativi"
    checklist within this same column, however, genuinely describes the
    supporting-document types the mission expects, so it is separately
    captured in `documents[]` (see Judgment call 7).
11. **No `edition` axis.** This is a standing national-visa application
    form, not a dated annual filing, consistent with this registry's
    convention for non-time-versioned application forms.
12. **`process.language` is `it`.** The modelled edition is the bilingual
    Italian/English specimen at the URL cited above; both languages are
    reproduced in every field's own `label`, the same bilingual-label
    treatment `hr/mvep` and `bg/mvnr` both already use for their own
    bilingual/dual-script source forms.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national visa-issuing authority, and submitting fabricated identity data
into a real government system is not a safe or reversible action.

Instead, two hand-authored mock instances were built from this document's
own field inventory and independently checked with a disposable,
from-scratch Node.js checker (not committed, per this registry's own
established practice of not committing one-off verification scripts) that
reads `schema.json`'s own `required`/`requiredWhen`/`validation.enum`/
`validation.pattern`/`validation.minimum`/`validation.maximum`/
`crossFieldValidation` grammar and evaluates it against each mock record —
the same technique already used by `hr/mvep`'s own conformance run.

- **`study-visa-single-applicant`** — an unmarried applicant filing under
  `purposeOfJourney: "study"`, not resident in a third country, single
  entry, no EU/EEA/CH family-member block populated, with the
  `addressInItalyForOtherPurposes` field (gated on the study/adoption/
  religious/medical/sport/mission purpose set) and the full
  `travelCostsCoveredBy: "applicant"` funding block populated (since study
  is one of the purposes for which item 28 is necessary per the form's own
  exclusion list). **PASS.**
- **`family-reunification-with-eu-family-member`** — a married applicant
  currently resident in a third country (exercising the full item-17
  residence-permit sub-block), filing under
  `purposeOfJourney: "family-reunification"` with the full item-26 contact
  block populated, the EU/EEA/CH family-member block populated
  (`familyRelationToEuEeaChCitizen: "spouse"`), and `travelCostsCoveredBy`
  correctly left absent (family reunification is one of the purposes the
  form's own text marks as not requiring item 28). **PASS.**

Six negative controls (each expected to fail exactly one rule):

1. Removing `surname` (unconditionally required) — correctly flagged as a
   missing required field.
2. Setting `sex` to an out-of-enum value (`"nonbinary"`) — correctly
   flagged as a `validation.enum` violation.
3. Setting `numberOfDaysOfIntendedStay` to `400` (exceeding the form's own
   365-day cap) — correctly flagged as a `validation.maximum` violation.
4. Swapping `travelDocumentDateOfIssue`/`travelDocumentValidUntil` so the
   document is valid before it was issued — correctly flagged as a
   `crossFieldValidation` violation.
5. Setting `maritalStatus: "other"` without supplying
   `otherMaritalStatusDetails` — correctly flagged as a missing
   conditionally-required field.
6. Setting `purposeOfJourney: "study"` (one of the purposes for which item
   28 is necessary) without supplying `travelCostsCoveredBy` — correctly
   flagged as a missing conditionally-required field.

All six negative controls were correctly rejected; no defects were found in
the schema itself.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/it/maeci/domanda-di-visto-nazionale-d/1.0.0/schema.json
ok   registry/it/maeci/domanda-di-visto-nazionale-d/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/it/maeci/domanda-di-visto-nazionale-d/1.0.0/schema.json
ok   registry/it/maeci/domanda-di-visto-nazionale-d/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- The page-1 "Spazio riservato all'Amministrazione" (For Office use only)
  column — office-use-only, not applicant-facing (see Judgment call 10).
- The physical signature itself (item 32) — per this registry's standing
  convention.
- Any purpose-specific supplementary annex or documentary checklist a
  specific Italian embassy/consulate may request in addition to this base
  form for a given purpose or nationality.
- The English-only mirror edition of this same form, if one exists at a
  different URL — this v1.0.0 models the bilingual Italian/English
  specimen at the URL cited above.

## Scope and jurisdiction notes

This document opens Italy's **Visa** vertical (1 of 6). `it/agenzia-entrate`
and `it/mit` already cover Taxes and DMV respectively; this document opens a
third IT authority segment, `it/maeci`.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-15** (6
months). A future review should prioritize: (1) confirming the source PDF's
sha256 is unchanged (a changed hash would require re-diffing the printed
item text before assuming no field-level change); (2) upgrading `status`
from `draft` to `verified` once a second independent reviewer cross-checks
this record against the live source.
