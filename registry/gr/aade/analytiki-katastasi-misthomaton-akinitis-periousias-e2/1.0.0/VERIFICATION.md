# Verification record — `gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2644**, a child of the
standing research routine (GOV-2609/GOV-2167). It adds Greece's **second
Taxes-vertical schema**, a companion to
`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1, GOV-2621, PR #429)
— the Independent Authority for Public Revenue's (AADE) Form Ε2, the
rental/real-estate income declaration that Form Ε1 itself cross-references
and defers to.

## Source verification (independently re-derived, not copied from the task)

- **Primary host re-confirmed blocked, this cycle:** direct `curl` to both
  `https://www.aade.gr/sites/default/files/2026-03/E2_2025.pdf` and the
  companion FAQ URL returned **HTTP 403** (`text/html`, ~430-450 bytes),
  consistent with this registry's established pattern for Greek government
  hosts (Akamai-gated from this sandbox; cf. `gr/mfa`'s and this schema's own
  companion `gr/aade` Ε1 schema's VERIFICATION.md for the identical wall).
- **CDX lookup, this cycle:** `http://web.archive.org/cdx/search/cdx?url=aade.gr/sites/default/files/2026-03/E2_2025.pdf&output=json`
  and the equivalent query for the FAQ URL each returned exactly one snapshot,
  confirming the task's own pre-scouted timestamps resolve to the live
  Wayback index rather than being guessed.
- **Form Ε2 — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419175523/https://www.aade.gr/sites/default/files/2026-03/E2_2025.pdf`
  — independently re-fetched this session via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **76,961 bytes**, **`sha256:
  86c0ea9303799e7101c476fa3192bd7fbf2056e1bddeaf58d36ddbdd6ba58cbf`** —
  computed independently via `sha256sum` on the freshly re-downloaded file,
  matching the task's own pre-scouted figures exactly.
- **Companion FAQ — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419183207/https://www.aade.gr/sites/default/files/2026-03/FAQS_E2_13032026.pdf`
  — independently re-fetched this session via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **283,557 bytes**, **`sha256:
  b4f4915bd9a9a3521310352337f870f7bf9db349a227bee8fe73aa79ea57832a`** — also
  matching exactly.
- Both parsed with `pdfjs-dist@3` (legacy build, `getTextContent()`, items
  grouped into rows by rounded `y` and sorted by `x`): Form Ε2 confirmed **3
  pages**, **6,976** extractable text chars; FAQ confirmed **8 pages**,
  **13,049** chars — matching the task's own pre-scouted figures exactly.
- `getAnnotations({intent:'display'})` confirmed **zero AcroForm widgets on
  every page** of the Ε2 specimen — a static, unfillable specimen (the same
  situation as this schema's Ε1 companion's own source), consistent with a
  form that is actually filed via myAADE e-filing or on paper, not as a
  downloadable fillable PDF.
- **Rendering-based geometry verification (new technique this cycle):** a
  pure text-position dump of pages 1-2 initially produced an ambiguous
  reading — column-number labels 1-19 appeared on **both** pages, and it was
  not obvious from token positions alone whether the 19-column table spans
  both pages or whether page 2 is a distinct panel. To resolve this
  authoritatively, both pages were **rendered to raster images** this cycle
  via `pdfjs-dist` + `node-canvas` (2.5x scale) and visually inspected
  directly (not merely inferred from operator-list geometry, which this
  cycle's own scratch attempt at reconstructing table lines from `moveTo`/
  `lineTo`/`rectangle` operators produced an internally-inconsistent y-range
  until superseded by the rendered raster). This **conclusively** established:
  - **Page 1** is the primary 19-column analytical table itself
    ("ΑΝΑΛΥΤΙΚΗ ΚΑΤΑΣΤΑΣΗ ΜΙΣΘΩΜΑΤΩΝ ΑΚΙΝΗΤΗΣ ΠΕΡΙΟΥΣΙΑΣ" — Detailed
    Statement of Real Estate Rents) — columns 1-19 run **left-to-right**,
    each **row** is one leased-property/tenant/lease-period entry, and the
    specimen prints **exactly 10 blank data rows** before its own ΑΘΡΟΙΣΜΑ
    (total) line — independently counted via horizontal-divider detection
    on the rendered raster (a left-margin greyscale column scan) and
    confirmed by direct visual inspection of the rendered page.
  - **Page 2** is a **distinct** page titled "ΣΥΜΠΛΗΡΩΜΑΤΙΚΑ ΣΤΟΙΧΕΙΑ
    ΑΚΙΝΗΤΗΣ ΠΕΡΙΟΥΣΙΑΣ" (Complementary/Supplementary Real Estate Details),
    itself containing **two further, separate** tables: (a) an
    11-column, 7-blank-row panel ("ΣΤΟΙΧΕΙΑ ΣΥΝΙΔΙΟΚΤΗΤΩΝ, ΣΥΝΕΠΙΚΑΡΠΩΤΩΝ,
    ΑΝΗΛΙΚΩΝ ΤΕΚΝΩΝ ΚΤΛ." — co-owners/co-usufructuaries/minor children, plus
    a sub-lease-rent-paid column), completed, per page 3's own instruction
    item 11, only when a property already listed on page 1 involves
    co-ownership, recent acquisition/transfer, or subletting; and (b) a
    separate Table ΙΙ ("ΑΚΙΝΗΤΗ ΠΕΡΙΟΥΣΙΑ ΠΟΥ ΤΟ ΦΟΡΟΛΟΓΙΚΟ ΕΤΟΣ 2025 ΕΙΝΑΙ
    ΗΜΙΤΕΛΗΣ Ή ΜΕΤΑΒΙΒΑΣΤΗΚΕ Ή ΑΠΟΚΤΗΘΗΚΕ ΑΠΟ ΑΓΟΡΑ-ΚΛΗΡΟΝΟΜΙΑ-ΔΩΡΕΑ-ΓΟΝΙΚΗ
    ΠΑΡΟΧΗ Κ.ΛΠ.", 4 blank rows) for property unfinished, transferred, or
    acquired during tax year 2025, plus the declarant/accountant signature
    block.
  - Page 3 carries the form's own **12 numbered field-completion
    instructions**, read directly from the position-sorted text layer.
- The companion FAQ's 8 pages carry **17 numbered Q&As**, also read directly
  from the position-sorted text layer, several of which materially informed
  this schema's scope and field descriptions (cited by question number
  below).

## Scoping decision (per GOV-2644's own explicit permission)

Form Ε2's own instructions and FAQ describe **materially different
property-use sub-cases** sharing the same 19-column row shape but populating
different gross-income columns and different lease-type/use codes: property
**rented out to a tenant** (columns 13/16, a real tenant with their own ΑΦΜ),
property **gratuitously granted for use** to a third party without payment
("Δωρεάν παραχώρηση", column 14 — no tenant, no rent), and property the
**owner uses themselves** ("Ιδιοχρησιμοποίηση", column 15 — no tenant at
all). Per the task's own explicit permission, this v1.0.0 scopes to the
**primary, most common case: property rented out to a tenant**, modeling:

1. **Shared/filer-level fields**: tax year, filer ΑΦΜ, filer name (or
   registered company name — the source's own single combined box), the
   form's own unexplained top-of-page reporting-period boxes, the
   administration-populated submission number/date, and optional accountant
   details.
2. **Page 1's primary 19-column analytical table**, modeled as a **bounded
   10-property repeating group** (`property1*` .. `property10*`), restricted
   to the columns relevant to the rented-out-to-a-tenant case (see below for
   the two gross-income columns excluded).

### Out of scope, disclosed

- **Column 14** (Δωρεάν παραχώρηση ακίνητης περιουσίας — gratuitous grant of
  use) and **column 15** (Ιδιοχρησιμοποίηση ακίνητης περιουσίας — owner's own
  use): both are alternate, mutually-exclusive-in-practice property-use
  sub-cases per page 3 instruction item 10 ("Στις στήλες 13, 14 και 15
  αναγράφεται το ακαθάριστο εισόδημα βάσει του είδους μίσθωσης-χρήσης του
  ακινήτου" — the gross income is recorded in *one* of columns 13/14/15
  depending on the property's lease type/use), neither of which involves a
  paying tenant. Not modeled; a natural companion-schema candidate for a
  future cycle (each would need its own `propertyNGrossIncomeFreeGrant`/
  `propertyNGrossIncomeSelfUse` field and a different tenant-optionality
  posture, since neither sub-case has a real tenant).
- **`propertyNLeaseTypeAndUse`'s excluded codes**: the companion FAQ's own Q3
  lists **67** numbered codes for column 17. This schema's enum models only
  the **15** core lease/sublease codes representing the primary rented-out
  case (codes 1-12, 24, 60, 61 — see the field's own description for the
  full value list). The remaining ~52 codes are disclosed as out of scope:
  13 free-grant codes (13-22, 26, 38), 11 self-use codes (27-36, 38), 1
  vacant code (39, "ΚΕΝΟ"), 1 uncollected-income tag (41 — modeled instead
  via the separate `propertyNGrossIncomeUncollected` numeric field, not as
  an enum value), 2 common-area codes (25, 37), 1 billboard-space code (23,
  excluded for narrowness — it is a lease sub-case but a narrow one), 13
  prior-year-arrears codes (43-55) plus 4 more (56-59), and 6 short-term
  vacant/registry-specific codes (62-67) tied to Article 72 §91 ΚΦΕ
  tax-exemption mechanics the FAQ (Q14) cross-references into Ε1 Πίνακας 6,
  out of scope. **Disclosed simplification:** code 40 does not appear at all
  in the FAQ's own numbered list (it jumps from 39 to 41) — an apparent gap
  in AADE's own source numbering, not an extraction error (confirmed by
  re-reading the position-sorted FAQ text directly).
- **Page 2, panel (a)** — "ΣΤΟΙΧΕΙΑ ΣΥΝΙΔΙΟΚΤΗΤΩΝ, ΣΥΝΕΠΙΚΑΡΠΩΤΩΝ, ΑΝΗΛΙΚΩΝ
  ΤΕΚΝΩΝ ΚΤΛ." (co-owners/co-usufructuaries/minor children' details, plus
  sub-lease rent paid) — completed only when a page-1 property involves
  co-ownership, recent acquisition/transfer, or subletting (page 3,
  instruction item 11). Not modeled; a disclosed companion-schema candidate.
  `propertyNCoOwnershipPercent` (page-1 column 12) is modeled since it
  applies to every page-1 row regardless of whether the page-2 supplementary
  panel is also completed.
- **Page 2, Table ΙΙ** — property unfinished, transferred, or acquired during
  tax year 2025 (purchase/inheritance/donation/parental grant). An entirely
  separate reporting case (a property *disposition* event, not an ongoing
  lease), not modeled; a disclosed companion-schema candidate.
- **Business-activity threshold (FAQ Q15/Q17)**: short-term rental of 3+
  properties (natural persons) or *any* short-term rental by a legal
  person/entity starting from 1.1.2024 is **not** real-estate income at all
  — it is business income declared on Form Ε3, not Ε2. This is a genuine,
  source-stated scope boundary of the form itself (not a modeling gap of
  this schema): such filers do not use Ε2 for that income in the first
  place.
- **Uncollected-rent prerequisite (FAQ Q4)**: declaring
  `propertyNGrossIncomeUncollected` presupposes the filer has already
  obtained a tax-office decision under Article 39 §4 ν.4172/2013 (per
  circulars ΠΟΛ.1024/2016, ΠΟΛ.1102/2016, and Α.1062/2026) confirming pursuit
  of a qualifying legal remedy against the tenant — a prerequisite
  administrative process, disclosed in the field's own description rather
  than modeled as a separate gating field.
- **Rent-mandatory-by-lease-type interaction (FAQ Q13)**: whether
  `propertyNMonthlyRent` must be completed depends on which code is chosen in
  `propertyNLeaseTypeAndUse` (e.g. not applicable to a vacant property) — the
  source does not provide a discrete per-code applicability table, so this
  cross-field nuance is disclosed in the field's description rather than
  encoded as a `requiredWhen` spanning all 15 enum values.
- **Column 19 (Declaration of Lease Information registration number)
  mandatory linkage (FAQ Q6)**: the source states this column is
  additionally mandatory for lease-type codes 64-67 (all excluded from this
  schema's restricted enum) — since none of the 15 in-scope codes carry that
  stated mandatory linkage, `propertyNLeaseInfoDeclarationNumber` is left
  optional for every property, disclosed rather than `requiredWhen`-gated on
  an enum value this schema doesn't expose.
- **Top-of-page "Από"/"Έως" reporting-period boxes**: printed on page 1
  alongside the Ε2/2025 heading, but neither the form's own 12-item
  instruction page nor the companion FAQ's 17 Q&As explain their purpose
  (read directly, not assumed absent). Modeled as optional
  `reportingPeriodFrom`/`reportingPeriodTo`, disclosed as unelaborated by
  the sources read this cycle.
- **Spouse's separate-filing requirement (page 3 instruction item 3; FAQ
  Q1/Q7)**: each spouse/civil partner who owns or co-owns real estate must
  submit their **own, separate** Ε2, even under a joint Ε1 return. This
  schema therefore models a **single filer's own Ε2** (no spouse-column
  pairing, unlike Ε1's Υποπίνακας 4Α precedent) — disclosed here rather than
  modeled as a second set of columns, since the source's own answer is
  "file two forms," not "one form with two columns."
- **Minor dependent child's property (FAQ Q5)**: filed within the parent's
  own Ε2 (first table plus page-2 panel (a), naming the child), which this
  schema's single-filer scope does not separately model. Disclosed, not
  modeled.
- **`ΑΘΡΟΙΣΜΑ` (total) row**: a derived arithmetic sum of the per-property
  gross-income columns already modeled per property (columns 13/16 for the
  in-scope case). Not separately modeled as its own field, consistent with
  this registry's preference for minimal, non-redundant structure — a
  consuming agent can compute it from the per-property values already
  captured.
- **`documents[]`**: no discrete required-attachment list is stated by either
  source for the in-scope filing pathway (the closest candidate, the
  uncollected-rent tax-office decision per FAQ Q4, is a *prerequisite*
  administrative outcome obtained before filing, not an attachment submitted
  with the Ε2 itself, and is already disclosed narratively on
  `propertyNGrossIncomeUncollected`). `documents[]` is OPTIONAL per §4 of the
  spec and is omitted entirely rather than populated with a stretch entry.

## Field structure: shared block + bounded 10-property repeating group

Per the rendering-based geometry verification above, page 1's own analytical
table prints **exactly 10 blank rows**. Since the GovSchema v0.3 field `type`
enum has no array/list primitive (`spec/proposals/0009-composite-repeating-values.md`,
GSP-0009, remains an unaccepted proposal — confirmed by re-reading
`spec/v0.3/SPEC.md` §6.1's own explicit callout that "v0.3 fields are still
flat"), this schema follows this registry's existing precedent for bounded
repeating groups (e.g. `dk/cpr/notification-of-entry`'s `entrant1FieldName`
.. `entrant6FieldName` convention, itself citing an even earlier
`se/migrationsverket` `child1`..`child5` precedent) and flattens the table
into `property1*` .. `property10*`, **16 in-scope columns per property**
(columns 2-3-4-5-6-7-8-9-10-11-12-13-16-17-18-19; column 1, the α/α entry
sequence number, is **not** separately modeled — page 3 instruction item 6
states it numbers "the increasing sequence of the entries, not of the
properties" themselves, and is redundant with each property's own `N` suffix
in this flattened representation, consistent with the `dk`/`se` precedents
which likewise did not model their own tables' leading row-number columns)
= **160 property fields**, plus **8 shared fields** = **168 fields total**.

Only **property 1**'s columns that the source states are mandatory are
modeled as statically `required`: `property1Location` (column 2, needed to
identify the property at all), `property1TenantName`/`property1TenantTin`
(column 6/7 — the defining fact of this schema's scoped "rented to a
tenant" case), `property1MonthlyRent` (column 11, mandatory per FAQ Q13
subject to the disclosed lease-type-dependent nuance above),
`property1LeaseTypeAndUse` (column 17, mandatory per page 3 instruction item
7 and FAQ Q2), and `property1ElectricityMeterNumber` (column 18, mandatory
per page 3 instruction item 8). Properties 2-10 are left **fully optional**,
matching the specimen's own open-ended "up to 10, however many apply" table
design and this registry's established `dk`/`se` convention (only the first
repeating entry's core fields are required; the rest opt in).

## Conformance run

Two hand-authored valid fixtures and six mutation-control fixtures were
built, and checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — disposable, same technique used
across this registry's other v1.0.0 cycles) validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` directly against `spec/v0.3/SPEC.md`'s own rules. The
fixture *data* files themselves (not the checker script) are committed under
`conformance/gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2/1.0.0/`,
consistent with this registry's own established `conformance/` directory
convention (see e.g. this schema's Ε1 companion's own committed fixtures at
`conformance/gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3/1.0.0/`).

- **`valid-single-property-leased-to-tenant.json`** — a single filer, one
  leased residence, only the statically-`required` fields populated (no
  optional fields at all).
- **`valid-two-properties-uncollected-and-sublease.json`** — a legal-entity
  filer with the reporting-period, submission-number/date, and
  accountant-details shared fields populated; property 1 exercises every
  in-scope column (floor position, category, area, full lease dates/months,
  co-ownership 50%, gross lease income, and the lease-info declaration
  number); property 2 (fully optional) exercises `sublease-real-estate`,
  `propertyNGrossIncomeUncollected`, and the FAQ Q8/Q9 "999999999"
  shared-meter placeholder electricity number.

```
$ node check_conformance.mjs schema.json \
    valid-single-property-leased-to-tenant.json \
    valid-two-properties-uncollected-and-sublease.json
valid-single-property-leased-to-tenant.json: 0 error(s)
valid-two-properties-uncollected-and-sublease.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops `filerTin` (a
  static `required: true` field) from the single-property valid fixture.
- **`mutation-control-missing-required-property1-field.json`** — drops only
  `property1TenantTin` from the single-property valid fixture, isolating a
  property-1-specific `required` violation.
- **`mutation-control-invalid-enum-value.json`** — sets
  `property1LeaseTypeAndUse` to `"lease-boat"`, not one of the 15 modeled
  enum values.
- **`mutation-control-invalid-tin-pattern.json`** — sets `property1TenantTin`
  to a 9-character all-letter string (`"ABCDEFGHI"`), preserving length 9 so
  only the `pattern` check (not a length check) fires.
- **`mutation-control-invalid-co-ownership-maximum.json`** — starts from the
  two-property valid fixture and sets `property1CoOwnershipPercent` to
  `150`, violating the field's `maximum: 100`.
- **`mutation-control-invalid-lease-months-maximum.json`** — starts from the
  two-property valid fixture and sets `property1LeaseMonths` to `13`,
  violating the field's `maximum: 12`.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-missing-required-property1-field.json \
    mutation-control-invalid-enum-value.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-co-ownership-maximum.json \
    mutation-control-invalid-lease-months-maximum.json
mutation-control-missing-required-field.json: 1 error(s)
  - filerTin: required but missing
mutation-control-missing-required-property1-field.json: 1 error(s)
  - property1TenantTin: required but missing
mutation-control-invalid-enum-value.json: 1 error(s)
  - property1LeaseTypeAndUse: value "lease-boat" not in enum ["lease-hotel","lease-clinic","lease-educational-institution","lease-entertainment-hall","lease-shop","lease-office","lease-warehouse","lease-land","lease-installation-or-structure","lease-residence","lease-industrial-premises-vat","lease-shopping-center-vat","sublease-real-estate","short-term-lease-article-39a","short-term-sublease-article-39a"]
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - property1TenantTin: value "ABCDEFGHI" does not match pattern ^[0-9]{9}$
mutation-control-invalid-co-ownership-maximum.json: 1 error(s)
  - property1CoOwnershipPercent: value 150 greater than maximum 100
mutation-control-invalid-lease-months-maximum.json: 1 error(s)
  - property1LeaseMonths: value 13 greater than maximum 12
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2/1.0.0/schema.json
ok   registry/gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2/1.0.0/schema.json
ok   registry/gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

The full registry (all 397 `schema.json`/`mapping.json` documents, including
this one) was re-validated with both `tools/validate.mjs` and
`tools/validate-ajv.mjs` immediately before opening this PR, to confirm this
addition did not regress any other document — both passed **397/397** (plus
3/3 `mapping.json` companions).

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (397 entries written).

## Scope and jurisdiction notes

- Adds Greece's **second Taxes-vertical schema**, a direct companion to
  `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1). `jurisdiction.level`
  is `national` — AADE is Greece's national tax authority.
- No `edition` member: same reasoning as this schema's Ε1 companion —
  GovSchema v0.3's `edition.scheme` vocabulary (§5.7) is closed to
  `us-tax-year`/`gb-tax-year`/`award-year`, none of which fit a Greek tax
  year; `taxYear` models it as a plain field instead.
- `process.type` is `filing`; `process.language` is `el` (both sources are
  entirely in Greek).
- **168 `fields[]` entries** (6 statically `required`, all on `property1*`
  plus the 3 filer-identification fields — 9 total `required: true`
  entries), no `documents[]` entries, no `exclusivityGroups` (no genuinely
  mutually-exclusive checkbox set was found in the in-scope columns).
- Companion-schema candidates for a future cycle, in priority order: the
  page-2 "ΣΥΜΠΛΗΡΩΜΑΤΙΚΑ ΣΤΟΙΧΕΙΑ" co-ownership/sub-lessor panel, the
  gratuitous-grant-of-use (Δωρεάν παραχώρηση) and self-use
  (Ιδιοχρησιμοποίηση) property-use sub-cases (columns 14/15), page-2 Table ΙΙ
  (property unfinished/transferred/acquired during the tax year), and the
  remaining ~52 `propertyNLeaseTypeAndUse` codes this v1.0.0 excludes
  (prior-year-arrears variants, common-area variants, billboard-space lease,
  and the four short-term-registry-specific vacant-residence codes). Form Ε3
  (business-activity statement) remains a separately-tracked companion
  candidate per the Ε1 schema's own VERIFICATION.md, now additionally
  cross-referenced by this schema's own FAQ Q15/Q17 business-activity
  threshold disclosure.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-confirming this edition
is still current once tax year 2026's own Ε2 specimen is published (AADE
republishes this form annually, alongside Ε1); (2) the page-2 co-ownership
panel and Table ΙΙ as the strongest structural companion-schema candidates,
given both are already fully read and disclosed this cycle; (3) the
gratuitous-grant-of-use and self-use property-use sub-cases, which would
each need their own tenant-optionality posture rather than reusing this
schema's tenant-required `property1*` fields as-is.
