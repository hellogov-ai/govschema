# Verification record — `gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2656**, a child of the
standing research routine (GOV-2609/GOV-2167), authoring the schema that the
prior **GOV-2644** cycle (2026-07-13) had already scouted and flagged as the
strongest, ready-to-author companion-schema candidate for
`gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` (Form Ε2,
PR #433) and `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1,
GOV-2621, PR #429). This schema adds AADE's **Form Ε3**, the
business/professional-activity income statement — Greece's **third**
Taxes-vertical schema.

## Source verification (independently re-derived, not copied from a prior cycle)

- **Primary host re-confirmed blocked, this cycle:** direct `curl` to both
  `https://www.aade.gr/sites/default/files/2026-03/entypoE3_fe_2025.pdf` and
  its companion instructions-manual URL each returned **HTTP 403**
  (Akamai-gated), consistent with this registry's established pattern for
  Greek government hosts and with this schema's Ε1/Ε2 companions' own
  VERIFICATION.md records.
- **CDX lookup, this cycle:** a fresh
  `http://web.archive.org/cdx/search/cdx?url=aade.gr/sites/default/files/2026-03/entypoE3_fe_2025.pdf&output=json`
  query (and the equivalent query for each of the other three source URLs
  below) returned the expected snapshot(s), confirming the URLs and
  timestamps used this cycle resolve to the live Wayback index rather than
  being guessed or copied verbatim from GOV-2644's own prior scouting notes
  (which had located the candidate but had not authored it).
- **Form Ε3 specimen** — source used (Wayback Machine mirror):
  `http://web.archive.org/web/20260419181557/https://www.aade.gr/sites/default/files/2026-03/entypoE3_fe_2025.pdf`
  — independently re-fetched this session via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **434,154 bytes**, **`sha256:
  72d4c0e9c8529cc510e4e40b6e3eb4d77a1094ab7544031712566f55f8ad2b31`** —
  computed independently via `sha256sum` on the freshly re-downloaded file.
  (Note: the CDX index's own `length` field for this snapshot, 412,864, is
  the WARC record's compressed length, not the decompressed
  `Content-Length` — confirmed by comparing against the live
  `Content-Length: 434154` response header, so this is not a discrepancy.)
- **Sub-tables specimen** ("Ε3 - Υποπίνακες") — source used:
  `http://web.archive.org/web/20260419184745/https://www.aade.gr/sites/default/files/2026-03/entypoE3_FE_202_ypopinakes.pdf`
  — **HTTP 200**, `application/pdf`, **376,069 bytes**, **`sha256:
  29f295ef3de8117c59edcf901bfbe85128905b3565f6b4021c1e5cf1e3861317`**.
- **Instructions manual** — source used:
  `http://web.archive.org/web/20260419184103/https://www.aade.gr/sites/default/files/2026-03/odigies_E3_FE_2025.pdf`
  — **HTTP 200**, `application/pdf`, **2,606,056 bytes**, **`sha256:
  0c8560ac02cf50bf755d84b74e2d1db9be855fe1e79c80632e6a2f36ad6dfa84`**. (The
  CDX index lists two snapshots of this URL with an identical digest,
  `20260417124508` and `20260419184103`; this cycle used the later one, for
  consistency with the other three sources' own April 19 snapshot day.)
- **FAQ** — source used:
  `http://web.archive.org/web/20260419181909/https://www.aade.gr/sites/default/files/2026-03/FAQs_E3_13032026_0.pdf`
  — **HTTP 200**, `application/pdf`, **398,508 bytes**, **`sha256:
  68b8fb2198aa6e2e549e8515fc196091b8e79fc12700b842e1b57b865d08a176`**.
- All four parsed with `pdfjs-dist@3` (legacy build, `getTextContent()`,
  items grouped into rows by rounded `y` and sorted by `x`): the Ε3 specimen
  confirmed **12 pages**, **17,039** extractable text chars, and
  `getAnnotations({intent:'display'})` confirmed **zero AcroForm widgets on
  every page** (a static specimen mirroring the myAADE e-filing screen
  layout, not itself a fillable PDF — the same situation as this schema's
  Ε1/Ε2 companions' own sources); the sub-tables specimen confirmed **8
  pages** / **11,332** chars; the instructions manual confirmed **89
  pages**; the FAQ confirmed **14 pages** / **30,608** chars. Every field
  modeled below, every numeric code cited, and every enum value was read
  directly from the position-sorted text layer of these four documents this
  cycle.

## Key structural finding: Πίνακας Ζ is the data-entry table; Πίνακας Δ/ΣΤ are derived

Reading the instructions manual's own code-by-code narrative for Πίνακας Δ
(pages 43-53 of the extracted text, manual §7) revealed that the source
form's headline financial tables are **not independent of one another**:

- Πίνακας Ζ1 (Σύνολο Εσόδων — Total Revenue, manual §6.1) and Πίνακας Ζ2
  (Σύνολο Εξόδων — Total Expenses, manual §6.2) are where the filer actually
  enters revenue and expense figures, one column per business-activity type
  (commercial, production, agricultural-biological, services), each
  cross-referenced to the corresponding Greek Accounting Standards Law
  (ν. 4308/2014) chart-of-accounts grouping (e.g. code 163 "Πιστωτικοί τόκοι
  και συναφή έσοδα" corresponds to account 72). Even Πίνακας Ζ1's own
  "total" codes (160/260/360/460/560) are stated to be **"υπολογιστικοί και
  όχι καταχωρητικοί κωδικοί"** (computational, not data-entry, codes) — i.e.
  even the per-column subtotal is system-derived from the codes above it.
- Πίνακας Δ (Οικονομικά Δεδομένα Επιχειρήσεων — gross profit / EBITDA / EBIT
  / pre-tax result, manual §7) is, with only a handful of exceptions (e.g.
  code 102, merchandise purchases, transferred from its own internal
  wholesale/retail/EU/non-EU sub-table), **entirely system-computed** from
  Πίνακας Ζ's own figures. Representative examples read directly from the
  manual this cycle: *"Κωδικός 120: Μεταφέρεται το ποσό του κωδικού 107"*
  (code 120 is simply copied from code 107); *"Κωδικός 126: Υπολογίζεται
  αυτόματα από το σύστημα και είναι το αποτέλεσμα των κωδικών [126] = [121]
  + [122] - [123] - [125]"* (EBIT is an automatic arithmetic derivation);
  *"Κωδικοί 100, 200, 300, 400: ... συμπληρώνονται αυτόματα από τους
  κωδικούς 161, 261, 361, 461 του πίνακα Ζ1 αντίστοιχα"* (Πίνακας Δ's own
  revenue-line codes are auto-populated straight from Πίνακας Ζ1).
- Πίνακας ΣΤ (Προσδιορισμός Φορολογητέων Κερδών — final taxable-profit
  determination, manual pages beyond those read this cycle) layers a long
  list of one-off subsidy/exemption adjustment codes (largely disaster-relief
  grants, sector-specific subsidies, and similarly narrow carve-outs — see
  the sub-tables specimen's own page 3 onward) on top of Πίνακας Δ's own
  derived pre-tax result, again downstream of Πίνακας Ζ.

This means the form's actual substantive economic data — the thing a
consuming agent most needs from a "business/professional activity income
statement" schema — lives in Πίνακας Ζ1/Ζ2, not in Πίνακας Δ/ΣΤ's derived
tax-computation figures. This is directly analogous to this registry's
established precedent of not separately modeling a form's own derived
arithmetic total (cf. this schema's Ε2 companion's own undocumented
ΑΘΡΟΙΣΜΑ-row precedent, and Ε1's Πίνακας-1-only scope) — except at a larger
scale, since here an entire multi-table downstream computation chain, not
just one summary row, is system-derived.

## Scoping decision

Given the above finding, and per the task's own instruction to scope to the
primary/core case (as Ε1 and Ε2 did) and disclose the rest, this v1.0.0
models:

1. **Cover-sheet / registration identification** (page 2, codes 001-014):
   declaration number (admin-populated), the three business-lifecycle dates
   (first commencement / current-year commencement / termination — all
   system pre-filled per FAQ Q4), books category (single-entry /
   double-entry / not liable), the commercial-capacity classification
   checkbox, the agricultural-activity VAT-regime selector, the entity-size
   classification under ν. 4308/2014 article 2, the agricultural-cooperative
   member exemption, the article 5C new-employment-position exemption (a
   direct sibling of this schema's Ε1 companion's own field of the same
   name), the business-fee exemption, and the legacy commercial-industrial
   profit-margin percentage.
2. **Πίνακας Α' (Στοιχεία Φορολογουμένου — taxpayer identification)**: ΑΦΜ,
   main and highest-revenue Κ.Α.Δ. codes plus the latter's free-text
   description, and the natural-person name fields / legal-entity company
   name (mutually exclusive by filer type, disclosed narratively rather than
   modeled as an exclusivity rule, consistent with this schema's Ε2
   companion's own precedent).
3. **Πίνακας Β' core fields**: the three employee-count fields
   (`employedPersonsCount`/`wageEarnersCount`/`seasonalStaffCount`).
4. **Πίνακας Ζ1 (Total Revenue) and Πίνακας Ζ2 (Total Expenses)**, restricted
   to the single **"Εμπορική δραστηριότητα"** (commercial/trading)
   activity-type column — the source's own first and most common of its
   four parallel activity-type columns — modeling every genuinely
   filer-entered revenue/expense line (9 revenue codes, 9 expense codes),
   each cross-referenced in its own `description` to the Greek Accounting
   Standards Law account grouping it corresponds to.

**43 total `fields[]` entries**, **5** statically `required`
(`taxYear`, `booksCategory`, `filerTin`, `kadMainActivityCode`,
`commercialSalesOfGoodsAndServices`) — the minimal set needed to identify
*that* a filer, in *what* tax year, under *what* books regime and business
code, reported *some* commercial revenue figure. No `requiredWhen`, no
`documents[]` entries (no discrete required-attachment list is stated by
either source for the in-scope filing pathway; `documents[]` is OPTIONAL per
spec §4 and is omitted rather than populated with a stretch entry), no
`exclusivityGroups` (the one genuinely either/or case — natural-person name
fields vs. `companyName` — is disclosed narratively per point 2 above, not
encoded as a mutual-exclusivity rule, since GovSchema v0.3 has no first-class
exclusivity-group construct beyond that already-established registry
convention).

### No bounded repeating group in this v1.0.0

Unlike this schema's Ε2 companion (which modeled a bounded 10-property
repeating group matching its specimen's own printed row count), **none of
this v1.0.0's in-scope fields are a repeating structure** — Πίνακας Ζ1/Ζ2's
commercial-activity column is a single-occurrence financial statement (one
filer, one tax year, one activity-type slice), not a list of entries. The
source form does contain several genuinely repeating/tabular structures, but
every one of them falls in this v1.0.0's disclosed out-of-scope set below
(see the sub-tables specimen for their own printed row counts, to honor if
modeled in a future cycle: the code-161/181/185 "Δυναμικός Πίνακας" wholesale
/ retail / intra-EU / third-country breakdowns; the Πίνακας Β' related-companies,
foreign-participations, and ΕΕΣΔΟΠ-members tables; the Πίνακας Γ1 rent-paid
list; and the Πίνακας Η construction-company projects table, printed with
exactly 4 blank rows on the specimen).

## Out of scope, disclosed

- **Πίνακας Δ (Οικονομικά Δεδομένα Επιχειρήσεων — gross profit / EBITDA /
  EBIT / pre-tax result)** and **Πίνακας ΣΤ (final taxable-profit
  determination)**: as established above, these are almost entirely
  system-computed derivations of Πίνακας Ζ1/Ζ2's own figures, not
  independent filer input. Not modeled, consistent with this registry's
  established precedent of omitting a form's own derived arithmetic totals.
  A future cycle could model Πίνακας ΣΤ's genuinely filer-decided
  subsidy/exemption adjustment line items (e.g. code 037, tips up to €300/month)
  as a distinct companion schema if a consuming agent's use case specifically
  needs them.
- **Πίνακας Ε (Προσωρινών Διαφορών μεταξύ Φορολογικής - Λογιστικής Βάσης —
  temporary tax/accounting-basis differences)**: a specialized reconciliation
  table for double-entry-book filers whose accounting and tax bases diverge
  (deferred income/expense timing differences). Not modeled; a narrow,
  double-entry-specific companion-schema candidate.
- **The production / agricultural-biological / services activity-type
  columns** of Πίνακας Ζ1/Ζ2 (codes 261-270/361-370/461-470 and
  281-290/381-390/481-490 respectively): structurally identical to the
  modeled commercial column, but a distinct companion-schema candidate for
  each (or a single companion modeling all three, if a future cycle prefers).
  A filer whose *only* business activity is, say, services rendered (not
  commercial/trading) would populate the source's "Παροχή Υπηρεσιών" column
  instead of the commercial column this schema models — disclosed here as
  this v1.0.0's central scoping limitation, consistent with the task's own
  instruction to scope to "the primary/core case."
- **Codes 169/190 (Φόρος Εισοδήματος έσοδα/έξοδα — income-tax income/expense)**:
  per the instructions manual, these codes remain inactive
  ("παραμένουν ανενεργοί") for individual businesses and apply only to legal
  persons/entities. Not modeled for this reason.
- **Codes 161/181/185's own internal "Δυναμικός Πίνακας" (dynamic sub-table)
  breakdowns**: entering these codes on the live source opens further
  sub-tables (wholesale/retail/intra-EU/third-country for code 161; gross
  pay/employer contributions/other benefits for code 181; a 16-item expense
  category list plus a 7% ΕΛΚΕ contribution for code 185). This schema
  models only each code's own roll-up total, disclosed as a companion-schema
  candidate — consistent with how this schema's Ε2 companion did not model
  its own analogous per-property sub-breakdowns beyond the primary case.
- **Πίνακας Β's remaining sub-panels** (codes 028-052): the 3-year
  (2023-2025) revenue/assets/headcount size-criteria comparison table, the
  related-companies (Συνδεδεμένες Επιχειρήσεις) and foreign-companies
  (code 051) participation tables, and the family-wealth-management special
  purpose entity (ΕΕΣΔΟΠ, code 052) members/shareholders table (code 038).
  Not modeled; niche compliance panels applicable only to a subset of
  filers.
- **Pages 4-5 informational panels**: active company websites (039), active
  professional payment accounts/IBANs (040), active POS terminals (041),
  active company email addresses (042), online sale-of-goods/services
  Yes/No flags (043/044), cooperating e-commerce platforms (045), inventory
  obligation flag (046), the aggregate results/gross-income/net-results
  summary pair (047/048), and the declarant-role/preparer-role identity
  codes (049/050). Not modeled; largely administrative/compliance-reporting
  boxes, a disclosed companion-schema candidate.
- **Πίνακας Γ (Σύνολο Ενοικίων που Καταβλήθηκαν - Στοιχεία Αγροτικών
  Επιδοτήσεων — total rent paid / agricultural subsidies received)**: a
  distinct companion sub-table (rent paid to landlords, by property, plus
  agricultural-subsidy amounts received by pillar). Not modeled; a
  disclosed companion-schema candidate, particularly relevant to filers with
  agricultural activity (out of scope for this v1.0.0's commercial-only
  financial-figure focus).
- **Πίνακας Η (Αναλυτική Κατάσταση Προσδιορισμού Καθαρών Κερδών Οικοδομικών
  Επιχειρήσεων — construction-company presumptive-profit calculation)**: a
  narrow, legacy presumptive-taxation mechanism (20% deemed profit margin)
  for construction companies whose building permits pre-date 1 January 2006,
  per the form's own footnote (15) and FAQ Q28. Not modeled; a niche
  vertical-specific candidate.
- **Πίνακας Θ (Country-by-Country Reporting obligation, νν. 4484/2017 /
  4490/2017 / 4534/2018)**: applicable only to legal persons/entities
  belonging to a Multinational Enterprise Group subject to that reporting
  obligation. Not modeled; a narrow, large-MNE-only compliance panel.
- **Πίνακας Ι (ν. 4557/2018 — anti-money-laundering / counter-terrorist-
  financing transaction reporting)**: applicable to real-estate brokers,
  dealers in high-value goods, and auctioneers reporting large cash
  transactions. Not modeled; a narrow, occupation-specific compliance panel.
- **Πίνακας ΙΑ / ΙΑ.Α' / ΙΑ.Β' (ν. 4935/2022 tax exemptions for legal persons
  and legal entities, articles 3/4/5)** and **Πίνακας ΙΒ (Pillar Two /
  global minimum top-up tax, ν. 5100/2024)**: both narrow, legal-entity-only
  panels (group-restructuring/contract-farming/franchise tax exemptions, and
  the OECD Pillar Two top-up-tax declaration for large multinational or
  domestic groups, respectively). Not modeled; niche, large-entity-only
  compliance panels.
- **Signature/footnote block (page 12)**: preparer/accountant identity and
  licence-category codes (090-094), submission-channel identity-verification
  text, and the form's own 17 numbered footnotes (read directly and used
  throughout this file and the schema's own field descriptions, but not
  themselves separately modeled as fields). Administrative, not modeled.
- **Free-text taxpayer notes** ("Σημειώσεις Φορολογούμενου", page 11,
  unnumbered): an open free-text box with no source-stated structure. Not
  modeled.

## Conformance run

Two hand-authored valid fixtures and seven mutation-control fixtures were
built, and checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — disposable, the same technique
used across this registry's other v1.0.0 cycles) validating
`required`/`type`/`validation.{enum,minimum,maximum,pattern}` directly
against `spec/v0.3/SPEC.md`'s own rules. The fixture *data* files themselves
(not the checker script) are committed under
`conformance/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/`.

- **`valid-natural-person-minimal.json`** — a natural-person filer, only the
  5 statically-`required` fields populated (no optional fields at all).
- **`valid-legal-entity-full.json`** — a legal-entity filer (double-entry
  books, `companyName` populated instead of the natural-person name fields)
  exercising every remaining in-scope field: the full cover-sheet/registration
  block, employee counts, and all 9 revenue + 9 expense commercial-column
  line items (several intentionally zero, to confirm a `minimum: 0` field
  accepts its own boundary value).

```
$ node check_conformance.mjs schema.json \
    valid-natural-person-minimal.json \
    valid-legal-entity-full.json
valid-natural-person-minimal.json: 0 error(s)
valid-legal-entity-full.json: 0 error(s)
```

Seven mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops `filerTin` (a
  static `required: true` field) from the minimal valid fixture.
- **`mutation-control-invalid-tax-year-pattern.json`** — sets `taxYear` to
  `"25"` (2 digits), violating `pattern: ^[0-9]{4}$`.
- **`mutation-control-invalid-tin-pattern.json`** — sets `filerTin` to an
  8-digit string, violating `pattern: ^[0-9]{9}$`.
- **`mutation-control-invalid-books-category-enum.json`** — sets
  `booksCategory` to `"cash-basis"`, not one of the 3 modeled enum values.
- **`mutation-control-invalid-entity-size-enum.json`** — starts from the
  legal-entity valid fixture and sets `entitySizeCategory` to
  `"extra-large"`, not one of the 7 modeled enum values.
- **`mutation-control-invalid-profit-margin-maximum.json`** — starts from
  the legal-entity valid fixture and sets
  `profitMarginPercentageCommercialIndustrial` to `150`, violating the
  field's `maximum: 100`.
- **`mutation-control-invalid-sales-minimum.json`** — sets
  `commercialSalesOfGoodsAndServices` to `-100`, violating the field's
  `minimum: 0`.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-invalid-tax-year-pattern.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-books-category-enum.json \
    mutation-control-invalid-entity-size-enum.json \
    mutation-control-invalid-profit-margin-maximum.json \
    mutation-control-invalid-sales-minimum.json
mutation-control-missing-required-field.json: 1 error(s)
  - filerTin: required but missing
mutation-control-invalid-tax-year-pattern.json: 1 error(s)
  - taxYear: fails pattern ^[0-9]{4}$
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - filerTin: fails pattern ^[0-9]{9}$
mutation-control-invalid-books-category-enum.json: 1 error(s)
  - booksCategory: value "cash-basis" not in enum ["single-entry","double-entry","not-liable"]
mutation-control-invalid-entity-size-enum.json: 1 error(s)
  - entitySizeCategory: value "extra-large" not in enum [...]
mutation-control-invalid-profit-margin-maximum.json: 1 error(s)
  - profitMarginPercentageCommercialIndustrial: 150 above maximum 100
mutation-control-invalid-sales-minimum.json: 1 error(s)
  - commercialSalesOfGoodsAndServices: -100 below minimum 0
```

All seven negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/schema.json
ok   registry/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/schema.json
ok   registry/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The full registry (all `schema.json`/`mapping.json` documents, including
this one) was re-validated with both `tools/validate.mjs` and
`tools/validate-ajv.mjs` immediately before opening this PR, to confirm this
addition did not regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Adds Greece's **third** Taxes-vertical schema, a direct companion to
  `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1) and
  `gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` (Form Ε2).
  `jurisdiction.level` is `national` — AADE is Greece's national tax
  authority.
- No `edition` member: same reasoning as this schema's Ε1/Ε2 companions —
  GovSchema v0.3's `edition.scheme` vocabulary (§5.7) is closed to
  `us-tax-year`/`gb-tax-year`/`award-year`, none of which fit a Greek tax
  year; `taxYear` models it as a plain field instead.
- `process.type` is `filing`; `process.language` is `el` (all four sources
  are entirely in Greek).
- **43 `fields[]` entries**, **5** statically `required`, no
  `documents[]` entries, no `exclusivityGroups`.
- Companion-schema candidates for a future cycle, in priority order: the
  production/agricultural-biological/services activity-type columns of
  Πίνακας Ζ1/Ζ2 (this v1.0.0's central scoping limitation), Πίνακας ΣΤ's
  genuinely filer-decided subsidy/exemption line items, Πίνακας Γ
  (rent-paid/agricultural-subsidies statement), the code-161/181/185 dynamic
  sub-table breakdowns, and Πίνακας Β's related-companies/foreign-participation/
  ΕΕΣΔΟΠ tables. Πίνακας Δ/Ε/ΣΤ's system-derived tax-computation figures are
  disclosed as *not* future companion-schema candidates in the ordinary
  sense, since they carry no independent filer input beyond what Ζ1/Ζ2
  (and this v1.0.0's other in-scope fields) already capture.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-confirming this edition
is still current once tax year 2026's own Ε3 specimen is published (AADE
republishes this form annually, alongside Ε1/Ε2); (2) disambiguating the
`firstCommencementDate`/`currentYearCommencementDate` code-to-label mapping
disclosed above as ambiguous from the text layer alone, ideally by rendering
page 2 to a raster image (as this schema's Ε2 companion did for its own
table-geometry ambiguity) to visually resolve which of codes 003/004
corresponds to which of the three printed date-box labels; (3) the
production/agricultural-biological/services activity-type companion columns,
the strongest structural companion-schema candidate given they are
byte-for-byte structurally identical to this v1.0.0's modeled commercial
column.
