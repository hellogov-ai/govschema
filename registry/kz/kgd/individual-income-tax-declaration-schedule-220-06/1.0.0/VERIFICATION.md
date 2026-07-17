# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-06` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3568**), deepening
Kazakhstan's Taxes vertical by authoring the sixth of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.06,
controlled-foreign-company (CFC) taxation, at the exact boundary the
GOV-3558 cycle's own Form 220.05 boundary check had already located and
disclosed (images 182-187, per the parent Form 220.00 schema's own
page-count estimate). This is the largest companion schedule authored so
far in this series: 6 printed pages, 18 CFC/PE entry rows, and 24 data
columns per row (versus 1-2 pages for every prior sibling).

## Why this candidate

The parent Form 220.00 schema's own VERIFICATION.md disclosed all ten
companion schedules' page ranges and subject matter as open backlog; the
GOV-3558 cycle's own boundary check for Form 220.05 additionally confirmed
(via the Order's own Rules text, Глава 7 ending cleanly before Глава 8
begins) that Form 220.06 starts at image 182. Given the disclosed,
pre-located backlog remained open and exact, this cycle deepened it
directly rather than re-scouting new ground — the same preference this
registry's routine already establishes, and the same schedule series the
GOV-3484/GOV-3506/GOV-3544/GOV-3551/GOV-3558 cycles already advanced five
times.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 and Forms 220.01-220.05 schemas source.
  - **URL (directly re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note — a partial, persistent image-endpoint gap for exactly two
    files, distinct from a full-site outage:** this cycle's live re-fetch of
    the image-serving path
    (`/rus/docs/V2500037390/files/1576/49/*.jpg`) returned **HTTP 404** with
    the site's own "Ведутся технические работы. Для поиска НПА просим
    перейти по ссылке" ("Technical maintenance work is underway") placeholder
    page for **images 182.jpg and 183.jpg specifically**, across many
    repeated attempts (plain `curl -k`, a browser-like `User-Agent`, and
    retries spaced across roughly an hour) — the same class of transient
    outage the GOV-3558 cycle already documented for image 181.jpg. Unlike
    that prior cycle's outage, however, this one did **not** clear for these
    two files even though **images 184.jpg through 194.jpg were successfully
    fetched fresh earlier the same day** (cached at `/tmp/kz220/`, byte sizes
    85-173 KB, valid JPEG `ffd8ffe0` headers) — while every attempt at
    182.jpg/183.jpg, at any time this cycle, returned the exact same
    19530-byte HTML placeholder body (confirmed byte-for-byte identical
    across attempts by inspecting the response header bytes, not just the
    HTTP status). This is disclosed as a real, unresolved, and somewhat
    unusual gap — not treated as evidence the files moved or were
    renumbered: the main document HTML page's own `<img src="...">` list
    confirms `/files/1576/49/182.jpg` and `183.jpg` as the expected,
    contiguous URLs between 181.jpg and 184.jpg, with no gap or renumbering
    in the sequence.
  - **Pages actually read this cycle: images 184.jpg-187.jpg** (форма 220.06
    стр.03 through стр.06), read visually at native and zoomed (3x-8x, via
    the `sharp` npm package reused from `/tmp/kz22004/node_modules`, cropped
    per section) resolution. Each page's own printed header directly and
    unambiguously reads "форма 220.06 стр.0N" (N = 3, 4, 5, 6) and "(Приложение
    6 к Декларации)" (Appendix 6 to the Declaration — the form's own internal
    numbering relative to Form 220.00), and the section title
    "НАЛОГООБЛОЖЕНИЕ ФИНАНСОВОЙ ПРИБЫЛИ КОНТРОЛИРУЕМОЙ ИНОСТРАННОЙ КОМПАНИИ"
    appears on every page.
  - **Pages not read this cycle: images 182.jpg-183.jpg** (form pages 1-2,
    covering the taxpayer-information header and columns B through I of the
    "Информация о КИК или ПУ КИК" table) — see "Scope and disclosed
    boundaries" below for exactly which fields this affects and how their
    definitions were sourced instead.
  - **Row-count determination (18 entry rows):** confirmed two independent
    ways on image 184: (1) a direct visual count of a zoomed crop of column
    A's row-number boxes, counting 18 distinct row bands below the "000001"
    label row, down to the page's own footer barcode; (2) a pixel-luminance
    scan down column A's box area (a small Node script reading raw pixel
    data via `sharp`), detecting 19 evenly-pitched (~22-25px) row-border
    line clusters — bounding 18 row intervals — with the scan's noise floor
    beginning exactly where the footer barcode begins. Both methods agree,
    and the same row count (18, restarting at "000001" each page) appears
    identically on all four read pages (184-187), confirming column A is a
    per-page repeated row-ordinal control rather than a running count.
  - **Column layout per page, confirmed by direct visual read:** each of the
    four read pages shows column A plus exactly 4 data columns — page 3
    (184): I-1, I-2, I-3, I-4; page 4 (185): I-5, I-6, I-7, I-8; page 5
    (186): I-9, I-10, J, K; page 6 (187): L, M, N, O. Column headers I-1
    through I-10 all print the identical text "Сумма уменьшения в
    иностранной валюте в соответствии с пунктом 5 статьи 335 Налогового
    кодекса" (distinguished only by their own "I-N" box label, not by
    per-column header wording); columns J, K, L, M, N, O each print distinct
    header text, transcribed verbatim into this schema's own field labels.
  - **Extraction method for read columns:** every visually-confirmed column
    (I-1 through O) was read directly off the rendered page image at zoom;
    field labels for these are verbatim transcriptions of the printed
    column headers. Column A ("№", boxed row ordinal) is a row-identity
    control, not applicant data, per the same established convention as
    every prior Form 220.0X sibling — row identity is expressed by the
    field-name ordinal (`entry1`...`entry18`), not a separate row-number
    field.
  - **No sheet-numbering box independently re-confirmed on the un-read
    pages** — the "Укажите номер текущего листа" (please specify current
    sheet number) box is visually confirmed on every one of the four
    read pages (184-187, top right), so this cycle models
    `currentSheetNumber` with confidence despite not independently
    re-reading pages 1-2 for it.

### Secondary source — the Order's own Rules text

- This cycle fetched and read the Order's own full HTML page text
  (`https://adilet.zan.kz/rus/docs/V2500037390`). A first text search for
  "Глава 8" surfaced a same-numbered but unrelated chapter — "Глава 8.
  Пояснение по составлению приложения к декларации (форма 100.06)" — the
  loss-accounting schedule for a *different* declaration (Form 100.00,
  corporate income tax), whose own "форма 100.06" heading and BIN-based
  (not IIN-based) taxpayer line made clear it was the wrong chapter; this
  was discarded once noticed, and an exact `"220.06"` text search located
  the correct chapter instead: **Глава 8. Пояснение по составлению формы
  220.06 – Налогообложение финансовой прибыли контролируемой иностранной
  компании** (Items 34-36), immediately following Form 220.05's own closing
  chapter (Глава 7) with no further 220.05-related content in between —
  confirming the far-end boundary the GOV-3558 cycle had already inferred
  from this same chapter transition.
  - **Item 34** states the schedule's purpose: reporting the CFC/PE's
    financial profit, the profit tax on it eligible for credit, and the
    individual income tax withheld or paid on RK-sourced income of the CFC,
    subject to the Article 334 exemption conditions (not reproduced here;
    referenced by number only).
  - **Item 35** describes the two-line taxpayer-information header: row 1
    is the IIN (with the same trust-manager substitution rule already
    established for the parent form and every sibling schedule); row 2 is
    the tax period.
  - **Item 36** describes the "Информация о КИК или ПУ КИК" table
    column-by-column, all 15 named columns (A through O) plus the 10-part
    reduction breakdown (I-1 through I-10) — the fullest single-item field
    inventory of any schedule in this series so far. Every column's
    definition is transcribed into the corresponding field's own
    `description`, each citing its own Item 36 subitem number. Two explicit
    arithmetic formulas are given in the text and reproduced in the
    affected fields' own descriptions rather than encoded as GSP-0013
    `crossFieldValidation` (whose grammar supports only
    equals/notEquals/greaterThan-family comparisons between two fields, not
    arithmetic derivations — no sibling schedule in this series uses it for
    this reason either): column J (`entryNProfitAfterReductionsAmount`) =
    column G − column H − column I; column K
    (`entryNTaxableProfitForeignAmount`) = column J × column E. Two
    explicit cross-form carry-overs are likewise disclosed in the affected
    fields' own descriptions instead of modelled as a destination field:
    column L's total carries to line 220.01.045, and column O's total
    carries to line 220.01.058 I, of the sibling
    `kz/kgd/individual-income-tax-declaration-schedule-220-01` schema — this
    document does not itself model those destination lines, matching the
    established convention that a schedule does not reach into its sibling's
    own field space.
  - **External statutory references not reconstructed.** Item 36 references
    Articles 332, 335, 339, and 346 of the Tax Code by number for the
    substantive rules behind several columns (CFC/PE definitions, the
    participation-coefficient computation, the two-preceding-period loss
    rule, the profit-tax credit computation). This cycle did not attempt to
    reconstruct, reproduce, or guess any of those articles' own text — only
    the column definitions the Order's Rules state directly are modelled.
  - **Country/currency-code classifiers (Items 55-56, general Rules, shared
    across the whole Order):** confirmed that column C (country code) and
    column F (currency code) both reference the same Customs Union
    classifiers already used throughout this Order — Appendix 22
    "Классификатор стран мира" and Appendix 23 "Классификатор валют"
    (both per Commission of the Customs Union Decision No. 378 of 20
    September 2010) — the same classifiers Form 220.04's own
    `entryNCountryCode`/`entryNCurrencyCode` fields already cite with a
    strict `^[0-9]{3}$` pattern, visually confirmed on that schedule's own
    (successfully fetched) pages. **This schedule's own columns C and F
    fall on the missing images 182/183**, so this cycle deliberately did
    **not** copy the sibling's strict 3-digit pattern onto a field it could
    not itself visually confirm — see "Scope and disclosed boundaries"
    below.

### Appendix-number citation

- Consistent with the GOV-3558 cycle's own re-derivation (independently
  re-checked, not re-run from scratch, this cycle) of the Order's enacting
  clause and the HTML content stream's single "Приложение 9 к приказу ...
  № 695" header immediately preceding the entire Form 220.00-220.10 image
  bundle (images 170-194), this schedule cites **"Приложение 9"** — matching
  Form 220.00/220.01/220.05's own already-correct citations, not the
  sequentially-incremented "Приложение 10/11/12" pattern already confirmed
  as a citation bug in the merged Forms 220.02-220.04 schemas (per GOV-3562).
  This cycle did not re-verify that finding from scratch; it is carried
  forward from the GOV-3558 record and GOV-3562's own disposition.

### Form convention confirmed

- **18 individual entry rows**, the largest row count of any schedule in
  this series so far (versus 10-17 for Forms 220.01-220.04, 11 for Form
  220.05).
- **24 data columns per row** (B through O, including the 10-part I-1
  through I-10 breakdown), the largest column count of any schedule in this
  series so far.
- **Column A ("№", boxed row ordinal)** is a row-ordinal control, not
  applicant data, per the same established convention as Forms
  220.00-220.05.
- **`currentSheetNumber`** (the "Укажите номер текущего листа" box) is
  present, per the same convention already established for Forms
  220.03-220.04.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.06 in full** — its six
pages, the taxpayer-identification header, the sheet-numbering field, and
all 18 individual CFC/PE entry rows across all 24 data columns. Explicitly
out of scope, and disclosed rather than silently omitted:

- **The four other remaining companion schedules** (Forms 220.07 through
  220.10) remain open, disclosed backlog for future companion schemas — see
  the parent Form 220.00 schema's own VERIFICATION.md for each remaining
  schedule's page count and subject matter.
- **Columns B, C, D, E, F, G, H, and I were not visually confirmed this
  cycle** — they fall on images 182 and 183, which returned the site's own
  maintenance placeholder on every attempt (see "Access note" above). Their
  field definitions are sourced entirely from Item 36 of the Order's own
  Rules text (a government-published, item-numbered specification, not a
  guess), but the exact printed box layout (digit counts, field widths) for
  these specific columns was not independently read from the page image.
  Concretely, this affects:
  - `entryNCfcName`, `entryNRegistrationNumber` — modelled as unconstrained
    strings; no digit/length constraint was available from either the
    image or the Rules text.
  - `entryNCountryCode`, `entryNCurrencyCode` — modelled as unconstrained
    strings, **deliberately not** copying Form 220.04's own strict
    `^[0-9]{3}$` pattern for the same underlying classifiers, since that
    pattern was visually confirmed on Form 220.04's own pages and this
    cycle could not make the same confirmation for this schedule's columns
    C and F. This mirrors the same conservative choice the parent Form
    220.00 schema itself already made for its own `currencyCode`/
    `residenceCountryCode` fields (`maxLength: 10`, no digit pattern).
  - `entryNParticipationCoefficient` — modelled as a 0-100 percentage
    number based on the Tax Code's own coefficient framing (Article 335
    paragraph 8, referenced but not reproduced), but the exact printed box
    format (percentage vs. a raw fraction) was not independently confirmed.
  - `entryNProfitBeforeTaxAmount`, `entryNPriorPeriodLossAmount`,
    `entryNReductionTotalAmount` — modelled as non-negative numbers
    per this registry's established convention for "Сумма"/"величина"
    columns, matching every sibling schedule's own treatment of analogous
    total/amount fields.
  - A future cycle with access to a working image endpoint for files
    182/183 should independently re-confirm the exact box layout for these
    eight columns and tighten their `validation` accordingly — this is
    disclosed as this schema's single largest known gap.
- **Columns I-1 through O were visually confirmed** via images 184-187 —
  see "Sources examined" above.
- **Articles 332, 335, 339, and 346 of the Tax Code's own substantive
  rules** (CFC/PE definitions, the loss-carryforward and reduction
  computations, the profit-tax credit computation) are referenced by
  Item 36 by number only; their own text was not examined this cycle and
  is not reproduced or guessed at anywhere in this schema.
- **The two explicit arithmetic formulas** (J = G − H − I; K = J × E) and
  **the two explicit cross-form carry-overs** (L → 220.01.045; O →
  220.01.058 I) are documented in the relevant fields' own `description`
  text but are not enforced as `crossFieldValidation` rules, since the
  GSP-0013 grammar does not support arithmetic derivations — the same
  limitation and the same disclosed choice every prior sibling schedule in
  this series has already made.
- **The trustee-filing substitution rule** (Item 35: if a trust manager
  performs the tax obligation, line 1 shows the trust manager's own IIN) is
  disclosed in the `iin` field's description but not separately modelled.

## Conformance fixtures

13 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-06/1.0.0/`:
2 valid submissions (one with only the two required header fields
populated; one fuller filing populating two CFC/PE entry rows across every
column, including the full I-1 through I-10 reduction breakdown for the
first entry) and 11 mutation-control fixtures (each expected to raise
exactly 1 error): a missing required `iin`, a missing required
`taxPeriodYear`, an invalid `iin` pattern (wrong digit count), an invalid
`taxPeriodYear` type (string instead of integer), an invalid
`currentSheetNumber` (below its `minimum: 1`), an invalid
`entry1ParticipationCoefficient` below its `minimum: 0`, an invalid
`entry1ParticipationCoefficient` above its `maximum: 100`, a negative
`entry1ProfitBeforeTaxAmount` (violating `minimum: 0`), a wrong-type
`entry1CfcName` (number instead of string), a wrong-type
`entry18ReductionItem10Amount` (string instead of number, deliberately
exercising the schema's very last entry row rather than only its first),
and an unknown field not defined anywhere in this schema. Given the field
count (435 fields — 3 header/page-level fields plus 18 rows × 24 columns),
mutation fixtures test one representative exemplar of each **distinct**
validation-rule shape present (pattern, type mismatch per JSON type,
`minimum`, `maximum`, required-missing, unknown-field), the same discipline
every prior Form 220.0X sibling has already established, rather than one
fixture per individually-repeated column across all 18 structurally
identical entry rows. All 13 were checked with a from-scratch, throwaway
Node mock validator implementing this schema's own `required`/`validation`
rules (not committed, per this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass with this schema
added — see the PR description for the exact pass count.

## Known gaps

- Forms 220.07 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- **Columns B, C, D, E, F, G, H, and I (images 182-183) were not visually
  confirmed this cycle**, due to a persistent, unresolved gap in the image
  endpoint specific to these two files (see "Access note" above). Their
  field definitions rest on the Order's own item-numbered Rules text, which
  is a genuine government-published source, but a future cycle should
  independently re-confirm the printed box layout once the endpoint
  recovers for these two files.
- Articles 332, 335, 339, and 346 of the Tax Code were not examined this
  cycle; every field description referencing them cites the article/
  paragraph number only, without reproducing or reconstructing their
  substantive text.
- The two explicit arithmetic formulas and two explicit cross-form
  carry-overs disclosed above are documented in field descriptions only,
  not enforced as schema-level validation (GSP-0013 limitation, shared with
  every prior sibling schedule).
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly:
four of the schedule's six page images (184-187) as scanned page images,
successfully re-fetched fresh the same day, plus this cycle's own fresh
read of the Order's HTML Rules text, which also supplied the definitions
for the two pages (182-183) this cycle could not fetch. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence, though the disclosed
page-1/2 gap above is a stronger candidate for early re-review than the
default cadence alone would suggest.
