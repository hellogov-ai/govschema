# Verification record — `gr/aade/dilosi-enarxis-metavolis-diakopis-ergasion-epiheirisis-d211` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`
- **`maturity.level`:** `structural-reference`

This is `GovSchema Standard Research` cycle **GOV-3036**, picking up
**GOV-3030** — a pre-scouted, ready-to-author candidate identified during
GOV-3026's scouting pass — both children of the standing research routine
(GOV-2167). It opens Greece's **Business Formation vertical (4 of 6;**
Greece already has DMV via `gr/yme`, Taxes via `gr/aade` Ε1/Ε2/Ε3, and Visa
via `gr/mfa`).

## Source verification (independently re-derived, not copied from the task)

- **Primary host confirmed blocked, this cycle:** the direct `aade.gr` URL
  for Δ211 is Akamai-gated against non-browser fetches, consistent with this
  registry's established pattern for Greek government hosts (cf. `gr/mfa`,
  `gr/aade`'s Ε1/Ε2/Ε3 VERIFICATION.md files, and `gr/yme`'s own
  VERIFICATION.md).
- **Mirror used:** the Athens Chamber of Commerce (ACCI) hosts an identical
  copy of the current v0.3 (06/22) edition at
  `https://acci.gr/wp-content/uploads/2022/11/D211-5.pdf` — independently
  re-fetched this cycle via `curl`: **HTTP 200**, `Content-Type:
  application/pdf`, **478,029 bytes** — matching the GOV-3030 scouting
  note's pre-scouted byte count exactly.
- **sha256, computed independently this cycle** on the freshly re-downloaded
  file via `sha256sum`: `5acd0e9902cde3a3cadf7fb9a9ca2ee62c8d936c3bfc7882bb7e2e545e050ffa`.
  This exact hash was not previously cited in the GOV-3030 scouting note, so
  it stands as this schema's own first independently-derived record.
- **Structural extraction**, `pdfjs-dist@3` (legacy build):
  - `getDocument(...).numPages` → **18 pages** — matches the scouting note.
  - `getFieldObjects()` → **268 named AcroForm field entries** — matches the
    scouting note's "genuine 268-field AcroForm" claim exactly.
  - Per-page `getAnnotations()` → **339 total Widget annotations**: 337
    across pages 3-16, plus 2 non-data "Print BTN 3"/"Clear Form 2" utility
    buttons on page 1 (correctly excluded from this schema's `fields[]`);
    pages 2, 17, and 18 are instructional/reference text with zero widgets
    — the field-count discrepancy between "268 field objects" and "339
    widget annotations" is expected: several field objects such as
    checkbox/radio groups and the numbered section-header nodes (`1`
    through `14`) have multiple child widgets or none directly, consistent
    with a composite hierarchical AcroForm).
  - Full text layer extracted via `getTextContent()`, position-sorted by `y`
    then `x` and grouped into rows, for all 18 pages (23,373 characters
    total). Page 2's own **section-routing table** ("Ποιες ενότητες
    καλούμαι να συμπληρώσω;") was read directly from this text layer — not
    assumed from the GOV-3030 scouting note — to derive the filer-category ×
    section mapping that drives this schema's scope decision (see below).

## Scope decision: why this v1.0.0 covers only two of the source form's four filer categories

Δ211 is a single composite form serving **four filer categories** across
**three actions** (Έναρξη/commencement, Μεταβολή/modification,
Διακοπή/cessation), routed entirely by the applicant's own selections in
section 1 and the resulting subset of sections 3-14 the form's own page 2
instructs them to complete:

| Filer category (§1.2) | Action(s) supported | Sections to complete (per page 2) |
|---|---|---|
| **A. Φυσικό πρόσωπο** (natural person) | Έναρξη / Μεταβολή | 3 (excl. 3.4-3.7), 4, 5, 6, 7, 8, 10, 11 |
| **B. Νομικό πρόσωπο ή Νομική οντότητα** (existing legal person/entity) | Έναρξη / Μεταβολή | 3 (all), 4, 5, 6, 7, 8, **9**, 10, 11, **12** |
| **C. Ιδρυτής υπό ίδρυση επιχείρησης** (founder of entity-under-formation) | Έναρξη / Μεταβολή / Διακοπή | 8, **13** |
| **D. Any of the above** | Διακοπή (cessation) | **14** |

Following the GOV-3030 issue's explicit instruction to "scope the schema to
the natural-person/entity-under-formation registration pathway (not
modification/cessation, to keep scope bounded per this registry's
established composite-filing conventions)", this v1.0.0 models:

- **Path A** (natural person) restricted to the **Έναρξη** action only.
- **Path C** (entity-under-formation founder) restricted to the **Έναρξη**
  action only.

**Explicitly out of scope for this v1.0.0** (disclosed, not silently
dropped):

- **Path B** (an already-existing legal person/entity) in its entirety,
  including section 3 fields 3.4-3.7 (legal form, bylaws number/date,
  validating authority — legal-entity-only per the page-2 routing table),
  section 9 (Members), and section 12 (Foreign Business Seat). Path B is a
  natural companion-schema candidate for a future version/schema — it is
  structurally very close to Path A plus these three sections.
- **All Μεταβολή (modification) and Διακοπή (cessation) fields**, regardless
  of filer category. Concretely: field-level text on **3.15** ("Αναγράφετε
  το είδος της Μεταβολής...") and **3.16** ("Σε περίπτωση Μεταβολής
  αναγράφετε...") states plainly these apply only when Ενέργεια =
  Μεταβολή, so both are excluded even though the page-2 table lists all of
  section 3 for Path A. Section 13.5 (Αιτία Διακοπής — reason for
  cessation of the entity-under-formation) is excluded for the same reason.
  Section 14 (Στοιχεία Διακοπής Επιχείρησης) is excluded in its entirety, as
  is section 15 signature.
- **Service-only fields** 1.4 (Ημερομηνία Δήλωσης) and 1.5 (Αριθμός
  Δήλωσης), both explicitly marked "Συμπληρώνεται από την υπηρεσία" (filled
  in by the tax administration, not the applicant).

The `action` field is modeled as an `enum` restricted to `["Έναρξη"]`
(rather than a free field accepting all three source values) so the schema
itself enforces the declared scope; `taxpayerStatus` is similarly restricted
to `["Φυσικό πρόσωπο", "Υπό ίδρυση Επιχείρηση"]`, excluding the Path B value.

## Modelling notes

- **Independent-checkbox vs. radio-group distinction** (this registry's
  established convention, cf. `si/ajpes`): mutually-exclusive single-select
  groups (e.g. `premisesType`, `bookCategory`) are modeled as a single
  `enum` field; genuinely combinable groups explicitly marked "Μπορείτε να
  συνδυάσετε..." (you may combine) on the source (e.g. `Τρόπος Άσκησης`
  mode-of-conduct, VAT regime, intra-community-transaction type, excise
  duty) are modeled as independent `boolean` flags, one per checkbox.
- **Bounded repeating groups** (this registry's `propertyN`/`childN`
  convention, cf. `gr/aade`'s own Ε2 schema): section 8 (representation) is
  bounded to 2 slots (`representative1*`/`representative2*`), matching the
  source's own instruction ("Αν έχετε να δηλώσετε επιπλέον στοιχεία
  εκπροσώπησης, συμπληρώνετε και δεύτερη δήλωση" — file a second
  declaration for more). Section 7's top-level secondary-activity block is
  **capped at 5 of its 11 source slots** (`secondaryActivity1`-`5`,
  source has 7.2-7.12), sufficient for the large majority of real filings,
  consistent with this registry's established large-repeating-group
  convention (cf. `si/ajpes`'s stock-schedule cap, GOV-2910) — the omission
  is disclosed here rather than silently truncated. Section 10's own nested
  secondary-activity block only has 5 source slots (10.16-10.20), so no cap
  was needed there. Sections 8, 10, and 11 are each single-slot in the
  source form itself for the primary entry (additional establishments or
  representatives require a second Δ211 filing per the source's own note).
- **Large closed-vocabulary code lists** printed on the form's own
  instructions pages (p.17: ~40 `Προέλευση Έναρξης` origin codes and ~130
  `Μορφή Μη Φυσικού Προσώπου` legal-form codes; p.18: ~150 `Είδος Σχέσης`
  relationship-type codes and ~35 `Είδος Εγκατάστασης` establishment-type
  codes) are modeled as free `string` fields with a `sourceRef` citing the
  instructions page, rather than fully enumerated inline — consistent with
  this registry's practice of not blowing up large external/legal-basis
  code lists into a JSON Schema `enum` (cf. `mainActivityCode`, whose valid
  values come from an entirely separate AADE spreadsheet not printed on the
  form at all).
- **Nested conditional requiredness**: `lessorTin`/`lessorName`/
  `leaseDeclarationNumber` (section 4.3.1-4.3.3) use the `Condition`
  grammar's `all` composite to require natural-person filers *and*
  `premisesType` being leased/granted-for-free, matching the source's own
  instruction ("σε περίπτωση επιλογής Μίσθωσης Έδρας ή Δωρεάν Παραχώρησης
  συμπληρώνετε και τα πεδία 4.3.1, 4.3.2, 4.3.3").
- The signature (§15.1) is modeled as a `documents[]` `attestation` entry
  rather than a data field, per the source's own note that it applies only
  to paper submission ("Χρησιμοποιήστε αυτό το πεδίο μόνο στην περίπτωση
  έντυπης υποβολής") — digital submission via the myAADE "Τα Αιτήματά μου"
  application requires no printing or physical signature. It is left
  `required: false` since this schema does not model a submission-channel
  field to gate a `requiredWhen` on (deliberately avoiding this registry's
  known `notEquals ""`-against-an-absent-field pitfall).

## Conformance fixtures

8 fixtures in `conformance/gr/aade/dilosi-enarxis-metavolis-diakopis-ergasion-epiheirisis-d211/1.0.0/`,
checked field-by-field (required/requiredWhen/visibleWhen condition
evaluation, `enum`/`pattern`/boolean-type validation) against an ephemeral
Node.js checker script re-implementing the shared `Condition` grammar
(`all`/`any`/`not`/`equals`/`notEquals`/`in`) — not committed, per this
registry's established practice:

- `valid-natural-person-commencement.json` — a sole-trader (Φυσικό
  πρόσωπο) commencing a leased-premises IT-services business, VAT-liable.
- `valid-entity-under-formation-commencement.json` — a founder (Υπό ίδρυση
  Επιχείρηση) commencing the formation of an ΙΚΕ, with one representative.
- `mutation-control-missing-required-field.json` — omits `taxpayerTin`
  (always-required) and every Φυσικό-πρόσωπο-conditional field.
- `mutation-control-invalid-enum-action-modification.json` — `action:
  "Μεταβολή"`, outside this v1.0.0's `["Έναρξη"]`-only enum.
- `mutation-control-invalid-tin-pattern.json` — `taxpayerTin` with letters,
  violating the 9-digit pattern.
- `mutation-control-missing-conditional-natural-person-address.json` — a
  Φυσικό πρόσωπο filing omitting every section-4 address field gated by
  `requiredWhen: taxpayerStatus == "Φυσικό πρόσωπο"`.
- `mutation-control-missing-conditional-founding-address.json` — a Υπό
  ίδρυση Επιχείρηση filing omitting every section-13 address field.
- `mutation-control-leased-premises-missing-lessor.json` — `premisesType:
  "Μίσθωση"` with the nested `all`-conditioned lessor fields omitted.
- `mutation-control-invalid-boolean-type.json` — `firstCommencement:
  "Ναι"` (a string) instead of a JSON boolean.

All 8 fixtures pass their expected verdict against the ephemeral checker.
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass the
full registry (462/462) with this schema included.

## Future companion-schema candidates (disclosed backlog, not authored here)

- **Path B** (existing legal person/entity commencement/modification,
  including sections 9 and 12) — the natural v1.1.0/companion extension.
- **Μεταβολή (modification)** across any filer category.
- **Διακοπή (cessation)**, section 14, across any filer category.
- The 6 additional secondary-activity slots (7.7-7.12) beyond this
  version's 5-slot cap, if a future review finds real-world filings
  regularly exceed 5 secondary activities.
