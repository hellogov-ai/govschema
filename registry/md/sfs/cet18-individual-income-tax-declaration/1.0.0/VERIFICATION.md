# Verification record — `md/sfs/cet18-individual-income-tax-declaration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3180)

GOV-3180 is a pre-scouted, ready-to-author candidate delegated from GOV-3157
(Moldova's DMV vertical opener, `md/asp/vehicle-registration`, now merged).
This document opens Moldova's Taxes vertical, bringing Moldova to 3 of 6
verticals (following DMV via `md/asp/vehicle-registration`, GOV-3157, and
Business Formation via `md/asp/cerere-inregistrare-intreprinzator-individual`,
GOV-3115). The candidate was re-verified from scratch rather than trusting
the prior cycle's disclosed note.

## Sources examined

- **Document `(id, version)`:** `md/sfs/cet18-individual-income-tax-declaration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** State Tax Service (Serviciul Fiscal de Stat, "SFS").
- **Primary source:**
  - Form file: <https://www.sfs.md/uploads/blank/226/document/forma-cet18pdf-69a1953b3177e0.49234558.pdf>
    — the `www.` subdomain is required; the bare `sfs.md` host is
    WAF-gated/403s, consistent with the prior cycle's note. Independently
    re-fetched this cycle via plain `curl`: **HTTP 200**, content-type
    `application/pdf`, **492,863 bytes**, sha256
    `5b502e0ddd70e2e942d456ad45bac8f51a1f714c7f3eaaef85141d48346d2bd9`. A
    genuine native-text-layer PDF (not scanned), 4 pages.
  - Corroborating sources: a web search independently returned
    `sfs.md/ro/pagina/cet18` ("Prezentarea Declarației cu privire la
    impozitul pe venit (CET18)"), `sfs.md/ro/formular/persoane_fizice`, the
    Ministry of Finance's own CET18 completion guide
    (`mf.gov.md`), and the SFS news item "SFS pune la dispoziția
    persoanelor fizice-cetățeni o gamă largă de soluții pentru a depune
    Declarația CET18" — all confirming CET18 is the current, live
    individual income-tax declaration, filed annually by April 30 for the
    preceding fiscal year, and confirming the 2%-style percentage tax
    designation (modeled here as Section M) and the 360,000-lei annual
    taxable-income filing threshold. `WebFetch` against
    `sfs.md/ro/pagina/cet18` itself confirmed the page title names the form
    verbatim but the page body is JS-rendered and did not yield further
    plain-text detail — not needed, since the direct PDF fetch and the web
    search corroboration are independently sufficient.
  - Text extracted with `pdfjs-dist` (3.11.174, `legacy/build/pdf.js`,
    CommonJS entry point — the package ships no `.mjs`/ESM build under
    `legacy/build`) with y-coordinate-based line reconstruction. All 4
    pages rendered to PNG at 3x scale via `node-canvas` for grid/layout
    confirmation; a number of embedded-font glyphs (Romanian diacritics in
    particular) failed to render as paths in this environment (logged as
    `getPathGenerator` warnings), dropping some words from the rendered
    image — the raw `pdfjs-dist` **text** extraction, unaffected by this,
    is the basis for every field's label/description, with the rendered
    image used only to confirm grid/row/column structure and blank-line
    counts, not to re-derive text content.
  - The rendered grid confirmed three bounded repeating structures whose
    row counts are not obvious from a plain-text read alone: **Table 1**
    ("Tabelul nr.1", the E3-E7 expense-substantiation schedule) prints
    **exactly 3** blank rows under its 8-column header (column 1 being a
    non-data row-number column); **Section K** (capital gain/loss
    computation) prints **exactly 5** numbered rows (1-5) plus a "Total"
    row under its 7-column (K1-K7) header. Both are modeled as
    disclosed-bounded repeating groups (`table1Row{1..3}<Column>`,
    `capitalRow{1..5}<Column>`) — a taxpayer with more substantiated
    entries than the form provides rows for has no further row on this
    document, consistent with this registry's established bounded-
    repeating-group technique (e.g. TZ/DK/FI entrant/child-N patterns).
  - Section K's own closed code legends (page 4) were read directly:
    capital-asset-type codes `MT` (Mijloc de transport/vehicle), `TR`
    (Teren/land), `OB` (Obligațiuni/bonds), `AT` (Acțiuni/shares), `ALT`
    (Alte imobile/other real estate), `CP` (Cotă-parte/share-quota), `AAC`
    (Alte active de capital/other capital assets); disposition-type codes
    `VIN` (vânzare-cumpărare/sale-purchase), `DON` (donație/donation),
    `SCH` (schimb/exchange), `AMS` (alt mod de înstrăinare/other
    disposition method) — both closed sets, modeled as `enum` validation
    on `capitalRow{N}AssetCode`/`capitalRow{N}DispositionCode` rather than
    free text.
  - Two source formula artifacts are disclosed rather than silently
    corrected: item D7's own printed total-exemptions formula, "(D1 sau
    D2) + D4 + (D5+D6)", excludes D3 (the base, non-increased spousal
    exemption) even though D3 is a distinct, separately-labeled line
    directly preceding D4 — reproduced exactly as printed in `d7TotalExemptions`'s
    own `description`. Item H8 (dividend income) is printed as its own
    line directly after the H7 subtotal rather than folded into H1-H6 —
    also reproduced as printed, disclosed in `h8DividendIncome`'s own
    `description`.
  - The raw `pdfjs-dist` text-extraction reading order interleaved
    Section K's own table between item H6 and the H7/H8 lines (a PDF
    content-stream paint-order artifact, not a logical ordering claim);
    the schema instead groups fields by their own printed section number
    (Section 2: C/D/E/F/Table 1; Section 3: H/J; Section 4: K; Section 5:
    M), which is how a human reader of the rendered page would group them.

## Scope decisions

1. **Modeled in full:** Section 1 (General Information — taxpayer
   category, citizenship, identity, domicile, own/spouse/dependents'
   fiscal codes, contact details); Section 2 (resident individual's
   computation — items C, D, E, Table 1, F); Section 3 (non-resident
   individual's computation — items H, J); Section 4 (item K's capital
   gain/loss schedule, shared by both Section 2's C2 and Section 3's H3
   via K8); Section 5 (item M's optional percentage tax designation); and
   the closing declaration, modeled as a `documents[]` attestation entry.
2. **Out of scope:** the form's own back-office intake stub (the tax
   official's stamp and signature acknowledging receipt of the
   declaration) — staff-completed data the taxpayer never supplies,
   consistent with this registry's established exclusion of similar
   office-only blocks.
3. **Items C/D/E/F (Section 2) and H/J (Section 3) are modeled
   `required: false`.** This is a single whole-of-form declaration
   covering both resident and non-resident computations; `taxpayerCategory`
   (item A) determines which of the two applies to a given filer, but the
   form gives no indication that the non-applicable section's lines must
   be entered as zero. This mirrors the established treatment of TZ's
   ITX201 and DO's IR-2 whole-of-form tax returns in this registry.
4. **`citizenship` is the only field modeled with `requiredWhen`** (gated
   on `taxpayerCategory` being A4 or A5) rather than left unconditionally
   optional like the rest of Section 2/3/4: the source form prints this
   exact blank line twice, directly beneath both of the two foreign-
   citizen checkboxes, making its conditional applicability an explicit,
   printed feature of the form itself (not an inferred convenience).
5. **`table1Row{N}ExpenseCode` is modeled as a closed `enum` (`E3`-`E7`)**,
   since the table's own header text names exactly that closed range
   ("conform codurilor E3 – E7"). **`table1Row{N}SupportingDocumentType`
   is modeled as free `string`**, since the column header itself gives an
   open-ended, non-exhaustive example list ("contractul, factura fiscală,
   extrasul din contul bancar, **etc.**").
6. **`validation.minimum: 0` is applied to every direct-entry amount field
   whose own label cannot logically be negative** (all C/H income and
   tax-withheld columns, D/E exemption/deduction amounts, Table 1/K row
   amounts); it is withheld from every field whose own printed formula can
   subtract to a negative result (`f1TaxableIncomeBeforeDonation`,
   `f4TaxableIncome`, `f6TaxReflectedInPersonalFile`,
   `j2TaxReflectedInPersonalFile`, `taxableCapitalGain`) — the same
   disclosed departure already established elsewhere in this registry
   (e.g. Dominican Republic's IR-2, GOV-3114; Tanzania's ITX201, GOV-3159).
   `f9TaxOverpaid`/`j5TaxOverpaid` keep `minimum: 0` since the form's own
   text states they are "entered without their sign" (i.e. always a
   non-negative magnitude), unlike the signed intermediate figures they
   are derived from.
7. **`dependentsFiscalCodes` (item B6) is modeled as a single
   comma-separated `string` field, not six discrete fields.** The source
   form itself prints up to six blank slots as one running,
   comma-punctuated list rather than six independently labeled fields;
   modeling it as a single field mirrors the source's own grouping.
8. **Every numbered item was checked for an asterisk or similar
   requiredness marking; only item B7 (contact details) carries one** —
   the form's own footnote ("Necompletarea poziției B7 nu va genera
   aplicarea sancțiunilor... din Codul fiscal") explicitly states that
   omitting B7 triggers no sanction, the basis for modeling
   `phoneNumber`/`emailAddress`/`fiscalMessageDissemination` as optional.
   No other item on this form carries a similar marking.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/md/sfs/cet18-individual-income-tax-declaration/1.0.0/`: 2 valid
scenarios plus 6 mutation-control fixtures. All 8 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own
`fields[]`/`documents[]`/`required`/`requiredWhen`/`validation` rules,
including `requiredWhen` condition evaluation; not committed to the repo)
before being finalized:

- `valid-resident-employment-only-refund.json` (a resident individual,
  category A1, with employment income only, filing a simple return that
  nets to a refund position via `f9TaxOverpaid`) — **0 errors**.
- `valid-nonresident-with-capital-gain-and-percentage-designation.json`
  (a non-resident individual, category A4, with salary and a single
  land-sale capital gain reported through Section K row 1, plus the
  optional Section M percentage designation) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `lastName`) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets
  `declarationSubmissionDate` to `15/04/2026`, not ISO 8601) —
  **exactly 1 error**.
- `mutation-control-invalid-taxpayer-category-enum.json` (sets
  `taxpayerCategory` to `"RESIDENT"`, not one of the form's own five
  checkbox codes) — **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `emailAddress` to
  `"not-an-email"`) — **exactly 1 error**.
- `mutation-control-invalid-capital-asset-code-enum.json` (sets
  `capitalRow1AssetCode` to `"XX"`, not in the page-4 asset-code legend) —
  **exactly 1 error**.
- `mutation-control-missing-citizenship-when-required.json` (drops
  `citizenship` from the A4 non-resident fixture, testing the
  `requiredWhen` gate) — **exactly 1 error**.
- `mutation-control-missing-declaration-attestation.json` (sets
  `documents.declarationOfAccuracy` to `false`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/md/sfs/cet18-individual-income-tax-declaration/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/md/sfs/cet18-individual-income-tax-declaration/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **480/480** (up from 479/479 before this document); `node
  tools/validate-ajv.mjs` → **480/480**.
- `node tools/verify-sources.mjs` — clean (no FAIL on this document's
  changed files).
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure — including
both the resident and non-resident computation paths, the bounded Table 1
and Section K repeating schedules, and the closed asset/disposition code
legends — is fully transcribed from the genuine, currently-served official
form, but no live submission through any SFS filing channel was attempted.
GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Republic of Moldova or the
Serviciul Fiscal de Stat.
