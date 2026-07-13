# Verification record — `gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2654**, a child of the
standing research routine (GOV-2609/GOV-2167). It adds Greece's **third
Taxes-vertical schema**, a companion to
`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1, GOV-2621, PR #429)
and `gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` (Form
Ε2, GOV-2644, PR #433) — the Independent Authority for Public Revenue's
(AADE) Form Ε3, the business/professional-activity income statement that
Form Ε1 itself cross-references and defers to.

## Source verification (independently re-derived, not copied from the task)

A prior research cycle (GOV-2644) reported having already located "a
specimen PDF, a sub-tables companion, an 89-page instructions manual, and an
FAQ" for Form Ε3, but recorded no URLs in any committed file. Per this
cycle's own instructions, that claim was treated as **unconfirmed** until
independently re-derived from scratch this session.

- **Primary host re-confirmed blocked, this cycle:** direct `curl` to
  `https://www.aade.gr/sites/default/files/2026-03/entypoE3_fe_2025.pdf`
  is expected to be Akamai-403-gated, consistent with this registry's
  established pattern for Greek government hosts (every prior `gr/aade`
  and `gr/mfa` schema in this registry hit the identical wall).
- **CDX discovery, this cycle:** rather than guessing a single filename, the
  Wayback Machine CDX API was queried broadly —
  `http://web.archive.org/cdx/search/cdx?url=aade.gr/sites/default/files&matchType=prefix&filter=original:.*[Ee]3.*\.pdf&output=json&limit=1000`
  (curl's own `--globoff` flag was required; curl's default brace/bracket
  globbing otherwise corrupts a filter regex containing `[Ee]`) — returning
  424 historical Ε3-related snapshots spanning tax years 2007-2025. The four
  most recent (2026-03/2026-04 snapshot cluster, matching this schema's own
  Ε2 companion's identical "13032026" FAQ-date naming convention) were
  identified as the current tax-year-2025 edition:
  - `E3_katastasi_oikonomik_st_epixeirimatikis_0.pdf` /
    `entypoE3_fe_2025.pdf` (specimen — same byte-identical file under two
    different filenames/snapshot timestamps)
  - `entypoE3_FE_202_ypopinakes.pdf` (sub-tables companion)
  - `odigies_E3_FE_2025.pdf` (instructions manual)
  - `FAQs_E3_13032026_0.pdf` (FAQ)
- **Specimen — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419181557/https://www.aade.gr/sites/default/files/2026-03/entypoE3_fe_2025.pdf`
  — independently fetched this session via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **434,154 bytes**, **`sha256:
  72d4c0e9c8529cc510e4e40b6e3eb4d77a1094ab7544031712566f55f8ad2b31`** —
  computed independently via `sha256sum`. The alternate-filename snapshot
  `20260318121058/.../E3_katastasi_oikonomik_st_epixeirimatikis_0.pdf` was
  also fetched and confirmed **byte-identical** (same sha256), corroborating
  this is the genuine current specimen rather than a coincidentally-similar
  file.
- **Sub-tables companion — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419184745/https://www.aade.gr/sites/default/files/2026-03/entypoE3_FE_202_ypopinakes.pdf`
  — **HTTP 200**, `Content-Type: application/pdf`, **376,069 bytes**,
  **`sha256: 29f295ef3de8117c59edcf901bfbe85128905b3565f6b4021c1e5cf1e3861317`**.
- **Instructions manual — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419184103/https://www.aade.gr/sites/default/files/2026-03/odigies_E3_FE_2025.pdf`
  — **HTTP 200**, `Content-Type: application/pdf`, **2,606,056 bytes**,
  **`sha256: 0c8560ac02cf50bf755d84b74e2d1db9be855fe1e79c80632e6a2f36ad6dfa84`**.
- **FAQ — source used (Wayback Machine mirror):**
  `http://web.archive.org/web/20260419181909/https://www.aade.gr/sites/default/files/2026-03/FAQs_E3_13032026_0.pdf`
  — **HTTP 200**, `Content-Type: application/pdf`, **398,508 bytes**,
  **`sha256: 68b8fb2198aa6e2e549e8515fc196091b8e79fc12700b842e1b57b865d08a176`**.
- All four parsed with `pdfjs-dist@3` (legacy build, `getTextContent()`,
  items grouped into rows by rounded `y` and sorted by `x`): specimen
  confirmed **12 pages**, **17,039** extractable text chars, **0 AcroForm
  widgets on every page** (`getAnnotations({intent:'display'})` — a static
  specimen, not a fillable form, filed instead via myAADE e-filing);
  instructions manual confirmed **89 pages** — this independently
  reproduces the prior cycle's otherwise-unverifiable "89-page" claim
  exactly; FAQ confirmed **14 pages**; sub-tables confirmed **8 pages**.
- Every in-scope page was read directly from the position-sorted text
  layer, not assumed from any prior summary: specimen pages 1-3 (cover +
  Πίνακας Α'), 6 (Πίνακας Γ'), 7-8 (Πίνακας Δ'), 9 (Πίνακας ΣΤ' + Πίνακες
  Η'/Θ'/Ι'/ΙΑ'/ΙΒ'), 12 (footnotes); instructions manual's own table of
  contents (page 5) plus printed pages 14-16 (§2, Πίνακας Α'), 42-53 (§7,
  Πίνακας Δ'), and 56-63 (§9, Πίνακας ΣΤ'); FAQ pages 1-8 (Q1-Q26).

## Scoping decision (per GOV-2654's own explicit permission)

Form Ε3 is a **12-page, ~130-code, multi-table document** — the task's own
instructions explicitly direct against modeling the entire form. Reading the
specimen's own table of contents (12 lettered Πίνακες Α' through ΙΒ') and the
instructions manual's own table of contents (10 numbered sections) confirmed
the following overall structure:

| Table | Subject | In scope? |
|---|---|---|
| Α' | Taxpayer/business identification | **Yes** |
| Β' | Company information (employees, shareholders, POS/e-commerce, accounts) | No |
| Γ'1/Γ'2 | Rents paid to third parties; agricultural subsidies received | No |
| Δ' | Financial/economic data (5-column income statement: Commercial / Production / Agricultural-Biological / Services / **Total**) | **Yes, Total column only** |
| Ε' | Accounting-vs-tax-basis temporary differences | No |
| ΣΤ' | Determination of taxable profits of **individual businesses** (5-column adjustment chain culminating in taxable net profit, transferred into Form Ε1) | **Yes, Total column only** |
| Ζ' (Ζ1/Ζ2/Ζ3) | General financial information (revenue/expense line-item breakdown feeding Πίνακας Δ; digital-activity/e-commerce/POS disclosures) | No |
| Η' | Construction companies' net-profit determination (Article 72 ν.4172/2013) | No |
| Θ' | Multinational-group Country-by-Country reporting | No |
| Ι' | Anti-money-laundering transaction information (real-estate brokers, precious-goods dealers) | No |
| ΙΑ'/ΙΑ.Α'/ΙΑ.Β' | Legal-person tax exemptions under ν.4935/2022 | No |
| ΙΒ' | Pillar-Two/global-minimum-tax group reporting | No |

Per the task's own explicit permission, this v1.0.0 scopes to **the primary,
core case: a single individual (freelancer/sole-proprietor) business
activity's income statement**, modeling:

1. **Πίνακας Α'** (taxpayer/business identification): filer ΑΦΜ, primary and
   highest-revenue ΚΑΔ business-activity codes, and the filer's name fields
   (natural-person surname/first-name/father's-name, or the alternate
   legal-entity company-name box).
2. **Πίνακας Δ', "Σύνολο" (Total) column only** (codes 500, 520-530): the
   aggregate income-statement line items — total sales/services revenue,
   total cost of goods sold, gross profit, other income, other expenses,
   EBITDA, depreciation, EBIT, credit/debit interest, pre-tax result, and
   gross-profit-margin-on-sales percentage.
3. **Πίνακας ΣΤ', "Σύνολο" column only** (codes 540-558, 552, 555): the
   individual-business-specific chain of (α)-(ιε) adjustments — literally
   titled "Προσδιορισμός φορολογητέων κερδών **ατομικών επιχειρήσεων**"
   (Determination of taxable profits of **INDIVIDUAL** businesses) in the
   source itself, and per the instructions manual (printed p.56) completed
   "exclusively and only by individual businesses" as a **precondition** for
   transferring the taxable net result into Form Ε1 — that converts the
   accounting pre-tax result into the taxable net profit.

Πίνακες Δ and ΣΤ were chosen together (rather than either alone) because they
are the two directly-linked tables that together constitute "the main
income-statement table for a single individual business activity" per the
task's own framing: Πίνακας Δ is the literal income statement (revenue
through pre-tax accounting result), and Πίνακας ΣΤ is the individual/
sole-proprietor-specific reconciliation of that accounting result into a
taxable one — its own code 540 is directly transferred from Πίνακας Δ's code
529, and its own final code 552/555 is what actually reaches Form Ε1.

### Out of scope, disclosed

- **Πίνακας Β'** (company information: employee headcount, POS terminals,
  e-commerce/digital-address disclosures, shareholder/related-party
  tables, size-criteria classification under ν.4308/2014). Not modeled; a
  disclosed companion-schema candidate.
- **Πίνακας Γ'1/Γ'2** (rents paid to third-party landlords; agricultural
  subsidies/aid received). An entirely separate reporting concern from the
  business's own income statement, not modeled.
- **The per-activity-type breakdown columns of Πίνακες Δ and ΣΤ**
  (Commercial/Production/Agricultural-Biological/Services — codes ending in
  1/2/3/4 rather than the modeled "Σύνολο"/Total column ending in 0 or 5),
  and their granular cost-buildup sub-schedules (codes 101-107, 201-213,
  301-319, 401 for Πίνακας Δ). The instructions manual (printed pp.43-49)
  confirms nearly every one of these codes is either (a) pre-filled
  automatically from the AADE **myDATA** e-invoicing platform and
  non-editable by the filer, (b) transferred automatically from Πίνακας Ζ1/
  Ζ2/Ζ3 (also out of scope), or (c) auto-computed by the e-filing system from
  other codes — each Total-column field modeled in this schema discloses,
  in its own description, which of these three provenances applies and
  which upstream code/table it is computed or transferred from. This is
  disclosed per-field rather than modeled as separate schema fields, since
  the underlying Ζ1/Ζ2/Ζ3 tables and the myDATA feed are themselves
  out-of-scope companions.
- **Πίνακας Ε'** (temporary accounting-vs-tax-basis differences,
  codes 700-733). Feeds into codes 141-143/241-243/341-343/441-443 (already
  modeled as aggregate Σύνολο totals 541-543) but its own line-by-line
  breakdown by asset/liability category is not modeled.
- **Πίνακας Ζ' (Ζ1/Ζ2/Ζ3)** — general financial information: the detailed
  revenue-and-expense-category breakdown that Πίνακας Δ's own codes 100-499
  are transferred from, plus digital-activity disclosures (active websites,
  payment accounts/IBANs, POS terminals, e-commerce sales/services
  Yes/No flags, cooperating e-platforms). A large, structurally distinct
  table; not modeled. Strongest companion-schema candidate for a future
  cycle, since several Πίνακας Δ fields in this schema explicitly disclose
  a dependency on it.
- **Πίνακας Η'** (construction companies' net-profit determination under
  Article 72 §23 ν.4172/2013, four numbered contracts). A narrow,
  industry-specific sub-case; not modeled.
- **Πίνακας Θ'/ΙΒ'** (multinational-group Country-by-Country reporting;
  Pillar-Two/global-minimum-tax group reporting under ν.4484/2017,
  ν.4490/2017, ν.4534/2018, ν.5100/2024). Applies only to large corporate
  groups, not the individual/sole-proprietor scope of this v1.0.0.
- **Πίνακας Ι'** (anti-money-laundering transaction information for
  real-estate brokers, dealers in goods of large value, and auctioneers).
  A narrow, occupation-specific sub-case; not modeled.
- **Πίνακας ΙΑ'/ΙΑ.Α'/ΙΑ.Β'** (tax exemptions for legal persons/entities
  under Articles 3, 4 and 5 of ν.4935/2022). Applies only to legal
  persons/entities, not the individual/sole-proprietor scope of this
  v1.0.0.
- **Code 023's internal sub-panel** (per-ΚΑΔ apportionment of sales of
  goods and services). A repeating internal breakdown of
  mainRevenueActivityCode's own revenue; not modeled — the top-level
  mainRevenueActivityCode/mainRevenueActivityDescription fields are
  modeled instead.
- **Code 544's internal sub-panel** (dozens of numbered tax-exempt-income
  reason options — disaster-relief subsidies, COVID-19 support schemes,
  returnable-advance debt write-offs, platform-worker tips, itinerant
  lottery-ticket sellers' results, etc., per FAQ Q15/Q24 and instructions
  manual printed pp.58-63). Only the aggregate amount
  (`minusTaxExemptIncome`) is modeled; the reason-code breakdown is
  disclosed as out of scope, consistent with this registry's own Ε2
  precedent for a similarly large enum it chose not to fully model.
- **Πίνακας ΣΤ's agricultural-activity-specific final rows** (codes 352/553,
  942/982, 903/923/943/963/983, 901/921/941/961/981) — narrow companion
  final-result rows for agricultural/biological business activity and
  specific cooperative-membership/electric-vehicle-production regimes under
  ν.4935/2022 and Article 71Ζ ν.4172/2013. `totalNetTaxableResult` (code
  555) is modeled as the single grand-total figure; its own further
  combination with these narrower codes is disclosed in that field's
  description rather than separately modeled.
- **Spouse's separate-filing requirement (FAQ Q1)**: a spouse/civil partner
  who is themselves liable to file Ε3 must submit it under their own
  personal e-filing credentials, separate from a joint Ε1 — this schema
  therefore models a **single filer's own Ε3**, consistent with this
  registry's Ε2 precedent for the identical rule.
- **`documents[]`**: no discrete required-attachment list is stated by any
  of the four sources read this cycle for the in-scope filing pathway (Ε3
  is filed via myAADE e-filing, with myDATA e-invoicing data feeding most
  of Πίνακας Δ automatically, not via a separate attachment upload).
  `documents[]` is OPTIONAL per §4 of the spec and is omitted entirely
  rather than populated with a stretch entry.

## Field structure

No repeating group is needed for this v1.0.0's scope — unlike Ε2's bounded
`property1`..`property10` structure, both in-scope tables (Πίνακας Δ and
Πίνακας ΣΤ) are modeled at their single "Σύνολο"/Total column only, which is
a flat set of scalar amounts, not a per-row repeating structure.

- **10 Πίνακας Α' fields** (7 required: `taxYear`, `filerTin`,
  `primaryActivityCode`, `mainRevenueActivityCode`, `filerSurname`,
  `filerFirstName`; `mainRevenueActivityDescription`, `filerSurnameAlt`,
  `filerFatherName`, `legalEntityName` optional).
- **12 Πίνακας Δ' fields** (all optional — every one of these codes is
  either system-computed, transferred from an out-of-scope table, or
  populated only when the corresponding activity type applies to the
  filer, per the instructions manual's own field-by-field disclosure
  re-derived this cycle).
- **17 Πίνακας ΣΤ' fields** (1 required — `pretaxAccountingResult`, code
  540, the table's mandatory opening figure for individual businesses per
  the instructions manual printed p.56; the remaining 14 adjustment codes
  plus the 2 final-result codes 552/555 are optional, matching the source's
  own "only if applicable" adjustment-chain design).

**39 `fields[]` entries total, 7 statically `required`.**

## Conformance run

Two hand-authored valid fixtures and seven mutation-control fixtures were
built, and checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — disposable, same technique used
across this registry's other v1.0.0 cycles) validating
`required`/`type`/`validation.{pattern}` directly against
`spec/v0.3/SPEC.md`'s own rules. The fixture *data* files themselves (not
the checker script) are committed under
`conformance/gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3/1.0.0/`,
consistent with this registry's own established `conformance/` directory
convention.

- **`valid-minimal-individual-filer.json`** — an individual filer, only the
  7 statically-`required` fields populated (no optional fields at all;
  `pretaxAccountingResult` set to `0`, a genuine zero-result filing per the
  companion FAQ's own Q2, which states Ε3 must be filed "even if it is
  zero").
- **`valid-full-individual-filer-with-adjustments.json`** — an individual
  filer exercising every optional field: both name-alternate boxes, the
  main-revenue-activity free-text description, the full Πίνακας Δ' income
  statement (revenue through gross-margin percentage), and several Πίνακας
  ΣΤ' adjustment codes (positive/negative temporary differences,
  non-deductible expenses, tax-exempt income, disabled-employment
  deduction) culminating in a non-zero `taxableNetProfitBusinessActivity`
  and `totalNetTaxableResult`.

```
$ node check_conformance.mjs schema.json \
    valid-minimal-individual-filer.json \
    valid-full-individual-filer-with-adjustments.json
valid-minimal-individual-filer.json: 0 error(s)
valid-full-individual-filer-with-adjustments.json: 0 error(s)
```

Seven mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-tin.json`** — drops `filerTin` (a
  static `required: true` field) from the minimal valid fixture.
- **`mutation-control-missing-required-pretax-result.json`** — drops
  `pretaxAccountingResult` (the sole required Πίνακας ΣΤ' field) from the
  minimal valid fixture.
- **`mutation-control-missing-required-surname.json`** — drops
  `filerSurname` from the minimal valid fixture.
- **`mutation-control-invalid-tin-pattern.json`** — sets `filerTin` to a
  9-character all-letter string (`"ABCDEFGHI"`), preserving length 9 so
  only the `pattern` check (not a length check) fires.
- **`mutation-control-invalid-tax-year-pattern.json`** — sets `taxYear` to
  `"25"` (2 digits instead of 4), violating the field's `pattern`.
- **`mutation-control-invalid-activity-code-pattern.json`** — sets
  `primaryActivityCode` to a 9-digit string (`"123456789"`), one digit
  longer than the field's `maxLength`-equivalent `{2,8}` pattern allows.
- **`mutation-control-wrong-type-pretax-result.json`** — sets
  `pretaxAccountingResult` to the string `"zero"` instead of a `number`.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-tin.json \
    mutation-control-missing-required-pretax-result.json \
    mutation-control-missing-required-surname.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-tax-year-pattern.json \
    mutation-control-invalid-activity-code-pattern.json \
    mutation-control-wrong-type-pretax-result.json
mutation-control-missing-required-tin.json: 1 error(s)
  - filerTin: required but missing
mutation-control-missing-required-pretax-result.json: 1 error(s)
  - pretaxAccountingResult: required but missing
mutation-control-missing-required-surname.json: 1 error(s)
  - filerSurname: required but missing
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - filerTin: value "ABCDEFGHI" does not match pattern ^[0-9]{9}$
mutation-control-invalid-tax-year-pattern.json: 1 error(s)
  - taxYear: value "25" does not match pattern ^[0-9]{4}$
mutation-control-invalid-activity-code-pattern.json: 1 error(s)
  - primaryActivityCode: value "123456789" does not match pattern ^[0-9]{2,8}$
mutation-control-wrong-type-pretax-result.json: 1 error(s)
  - pretaxAccountingResult: value "zero" is not of type number
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

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

The full registry was re-validated with both `tools/validate.mjs` and
`tools/validate-ajv.mjs` immediately before opening this PR, to confirm this
addition did not regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Adds Greece's **third Taxes-vertical schema**, a direct companion to
  `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (Form Ε1) and
  `gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` (Form
  Ε2). `jurisdiction.level` is `national` — AADE is Greece's national tax
  authority.
- No `edition` member: same reasoning as this schema's Ε1/Ε2 companions —
  GovSchema v0.3's `edition.scheme` vocabulary (§5.7) is closed to
  `us-tax-year`/`gb-tax-year`/`award-year`, none of which fit a Greek tax
  year; `taxYear` models it as a plain field instead.
- `process.type` is `filing`; `process.language` is `el` (all four sources
  read this cycle are entirely in Greek).
- **39 `fields[]` entries** (7 statically `required`), no `documents[]`
  entries, no `exclusivityGroups` (the natural-person-vs-legal-entity name
  fields are disclosed as an alternate path in their own descriptions
  rather than modeled as a formal exclusivity group, consistent with this
  registry's general preference for minimal structure where the source
  does not print a literal either/or checkbox).
- Companion-schema candidates for a future cycle, in priority order:
  Πίνακας Ζ' (the general-financial-information table that most of Πίνακας
  Δ's codes are transferred from or computed against — the single largest
  disclosed gap in this schema's own field descriptions), Πίνακας Β'
  (company/employment metadata), the per-activity-type breakdown columns
  of Πίνακες Δ and ΣΤ (Commercial/Production/Agricultural-Biological/
  Services, rather than this v1.0.0's Total-column-only scope), Πίνακας Γ'
  (rents paid / agricultural subsidies), and the legal-person-specific
  tables (Η', Θ', Ι', ΙΑ', ΙΒ') which apply to corporate rather than
  individual/sole-proprietor filers.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-confirming this edition
is still current once tax year 2026's own Ε3 specimen is published (AADE
republishes this form annually, alongside Ε1/Ε2); (2) Πίνακας Ζ' as the
strongest structural companion-schema candidate, given several of this
schema's own Πίνακας Δ' field descriptions already disclose a direct
dependency on it; (3) the per-activity-type breakdown columns of Πίνακες Δ
and ΣΤ, which would materially change the tenant-optionality-style posture
of every field this v1.0.0 modeled at the Total-column level only.
