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
controlled-foreign-company (КИК) taxation, the largest remaining companion
schedule by page count (6 pages, images 182-187, per the parent Form 220.00
schema's own disclosed boundary table).

## Why this candidate

CATALOG.md's own "Genuinely open, well-sourced candidates" section disclosed
five remaining companion schedules (Forms 220.06-220.10) as open backlog
after the GOV-3558 cycle authored Form 220.05. Given the disclosed,
pre-located Form 220.0X backlog remained open and exact, this cycle deepened
it directly rather than re-scouting new ground — the same preference this
registry's routine already establishes, and the same schedule series the
GOV-3484/GOV-3506/GOV-3544/GOV-3551/GOV-3558 cycles already advanced five
times.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** ("Об утверждении форм налоговой
  отчетности с пояснением по их составлению и Правил их представления") —
  the same order the parent Form 220.00 and Forms 220.01-220.05 schemas
  source.
  - **URL (directly re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390` (2,660,117 bytes, sha256
    `db1db6a1893b8b75e3c827f7c5eb6d99b460df978439822ba85800aeff7524b0`).
  - **Access note — the same live outage documented in the immediately
    preceding GOV-3558 cycle recurred for two of the six images this cycle
    needed:** the domain's TLS-certificate-chain quirk (already documented
    in every prior 220.0X cycle) remains a non-issue with `curl -k`.
    However, this cycle's live re-fetch of the image-serving path
    (`/rus/docs/V2500037390/files/1576/49/182.jpg` and `.../183.jpg`)
    consistently returned **HTTP 404** with the site's own "Ведутся
    технические работы. Для поиска НПА просим перейти по ссылке" (technical
    maintenance in progress) placeholder page (19,530 bytes, sha256
    `4ccb02bc8f6764e4e1b2e4802efc008755959bb3f2b08cbec746f057ee682577`) —
    retried repeatedly across the session with delays, a fresh cookie, and a
    browser-like User-Agent/Referer, never recovering. This is a transient,
    site-wide (or at minimum, these-two-files-wide) maintenance outage, not
    evidence the files were moved or removed. **Unlike the GOV-3558 cycle**,
    which hit this outage for all of images 179-181, this cycle's outage was
    narrower: images **184.jpg through 188.jpg fetched successfully as real
    JPEGs** (confirmed via JFIF magic bytes) in the same session, only
    182.jpg and 183.jpg 404'd. No cached copies of 182.jpg/183.jpg were
    found in any prior cycle's `/tmp` scratch directory (checked
    `/tmp/kz22004`, `/tmp/kz220`, `/tmp/gov3554-verify`, `/tmp/kz22005`) —
    Form 220.06 had not yet been authored by any prior cycle, so no earlier
    cycle had reason to have fetched past image 181.
  - **Images fetched fresh this cycle, sha256-verified:**
    - `184.jpg` (форма 220.06, стр.03): 168,228 bytes, sha256
      `beca7c49f6504d9e1d454ce565b37914f57d699cc7604f8aa6912cb726a1d56f`
    - `185.jpg` (форма 220.06, стр.04): 166,957 bytes, sha256
      `459a37ed76af0da96aed67d91e370d40a7ece61d1cfa954aa9caf2ad621f1dd3`
    - `186.jpg` (форма 220.06, стр.05): 169,424 bytes, sha256
      `f6a68da7d04d28e828763568b8342a9875d9ebb3f6512e97584eaf5815e20a3e`
    - `187.jpg` (форма 220.06, стр.06): 173,072 bytes, sha256
      `e107eff9940ee33a7245592f20c05177a2f3d04c85254d09cad9b00ead7ff770`
    - `188.jpg` (форма 220.07, стр.01, fetched only to confirm the far-end
      boundary): 113,814 bytes, sha256
      `936e32807230d4908bf0bc6898570c67dc31a59ba793b056726245c52542ed9c`
  - **Images 182.jpg (стр.01) and 183.jpg (стр.02) could not be fetched
    fresh this cycle** due to the outage above — a genuine, disclosed gap.
    These would have shown this schedule's taxpayer-identification header
    layout and the entity table's columns B through I(main).
  - **Boundary check, near end (images 184-187):** each image's own printed
    header reads directly and unambiguously: 184.jpg "форма 220.06 стр.03",
    185.jpg "форма 220.06 стр.04", 186.jpg "форма 220.06 стр.05", 187.jpg
    "форма 220.06 стр.06" — all with subtitle "(Приложение 6 к
    Декларации)" and title "НАЛОГООБЛОЖЕНИЕ ФИНАНСОВОЙ ПРИБЫЛИ
    КОНТРОЛИРУЕМОЙ ИНОСТРАННОЙ КОМПАНИИ".
  - **Boundary check, far end — independently re-confirmed this cycle,
    resolving the exact gap the GOV-3558 cycle's own VERIFICATION.md
    flagged as unconfirmed:** image 188.jpg's own header reads directly
    "форма 220.07 стр.01" with title "БЕЗВОЗМЕЗДНО ПОЛУЧЕННОЕ (ПЕРЕДАННОЕ)
    ИМУЩЕСТВО (БЛАГОТВОРИТЕЛЬНАЯ ПОМОЩЬ, СПОНСОРСКАЯ ПОМОЩЬ, ДЕНЬГИ И
    ДРУГОЕ ИМУЩЕСТВО)" — confirming Form 220.07 begins at image 188, not a
    continuation of 220.06. This matches the parent Form 220.00 schema's own
    disclosed page-count estimate ("220.06 — images 182-187, 6 pages").
  - **Boundary check, near end (start) — not independently image-confirmed
    this cycle, due to the outage.** Image 182.jpg could not be fetched to
    visually confirm its own "форма 220.06 стр.01" header. This rests
    instead on: (1) the parent Form 220.00 schema's own disclosed estimate;
    (2) the Order's own Rules text, whose Глава 7 (Form 220.05's own
    chapter) ends cleanly at Item 33(4) and is immediately followed by
    Глава 8 ("Пояснение по составлению формы 220.06..."), with no further
    220.05-related content in between; (3) images 184-187's own "стр.03"
    through "стр.06" page numbers, which are only consistent with 182/183
    being стр.01/стр.02 of the same form.
  - **Row-count determination (18 individual CFC/PE-entry rows, no
    grand-total row):** confirmed on image 184.jpg two independent ways:
    (1) a direct visual count of zoomed crops of column A's row-number
    boxes — one pre-printed sample row reading "000001" (the row-ordinal
    control, not applicant data, per this registry's established
    convention) followed by 17 blank entry-ordinal rows, all evenly spaced
    down to the page's own footer barcode, cross-checked via 3-row-group
    crops (rows 1-3, 10-12, 16-18) that aligned cleanly at a constant pitch
    with no drift; (2) a pixel-luminance row-boundary scan (a small Node
    script reading raw pixel data via the `sharp` npm package, reused from
    `/tmp/kz22004/node_modules`) down column A's box area, detecting a
    consistent ~23-26px row pitch across a ~468px table-content span,
    dividing evenly into exactly 18 rows (468px / 18 rows = 26.0px/row).
    Both methods agree. This is one more row than Form 220.05's 11-row
    table and one more than Form 220.04's 17-row table — consistent with
    this being the largest companion schedule by both page and row count.
  - **Column layout, confirmed directly from images 184-187:** each page
    repeats column A (№, row ordinal) alongside 4 data-column groups: image
    184 (стр.03) shows columns I-1, I-2, I-3, I-4; image 185 (стр.04) shows
    I-5, I-6, I-7, I-8; image 186 (стр.05) shows I-9, I-10, J, K; image 187
    (стр.06) shows L, M, N, O. This confirms a strict "4 data columns per
    page" layout for the second half of the table (16 columns across 4
    pages).
  - **Columns B through I(main) (8 columns), on the un-fetched images 182
    and 183, are inferred rather than image-confirmed this cycle** — by
    extending the same "4 data columns per page" pattern backward (page 182
    = A,B,C,D,E; page 183 = A,F,G,H,I(main)) and cross-checked against the
    Order's own Rules text (Items 36(2)-36(9)), which independently
    describes exactly these 8 columns in exactly this order, with no gaps
    or extra columns. This is disclosed as a real, if lower-confidence,
    gap: a future cycle should independently re-confirm images 182-183 once
    the site's image endpoint recovers, per this registry's established
    practice of flagging rather than silently guessing at unconfirmed
    boundaries (the same practice the GOV-3558 cycle itself followed for
    image 182 in its own cycle).
  - **Extraction method:** columns confirmed by image (I-1 through O) were
    read directly off the rendered page images at zoom (3-8x, via `sharp`).
    Columns B through I(main), not directly imaged this cycle, were
    transcribed from the Order's own Rules text (Items 36(2)-36(9)) instead.
    Column A ("№", boxed digits) is a row-ordinal control, not applicant
    data, per the same established convention as Forms 220.00-220.05. All
    money columns (G, H, I, I-1 through I-10, J, K, L, M, N, O) print the
    same трлн/млрд/млн/тыс (trillion/billion/million/thousand) place-value
    group labels already established for other Form 220.0X money fields, as
    directly confirmed on images 184-187.

### Secondary source — the Order's own Rules text

- This cycle fetched and read the Order's own full HTML page text
  (`https://adilet.zan.kz/rus/docs/V2500037390`) and found **Глава 8.
  Пояснение по составлению формы 220.06 – Налогообложение финансовой
  прибыли контролируемой иностранной компании** (Items 34-36) — the
  Ministry's own line-by-line instructions for this exact schedule,
  immediately following Item 33(4)'s closing instructions for Form 220.05
  and immediately preceding Глава 9 (Item 37, Form 220.07).
  - **Item 34** states the form's purpose: reflecting the financial profit
    of a CFC (КИК) or CFC permanent establishment (ПУ КИК), the profit tax
    creditable against it, and individual income tax withheld/paid on
    CFC-sourced income. It also states an explicit **out-of-scope
    exclusion**: financial profit exempt from Kazakhstan taxation under
    Article 334 of the Tax Code (given qualifying supporting documents per
    paragraph 2 of that article) is **not** reported on this form at all —
    disclosed here rather than modelled, since it is a filing-eligibility
    condition, not a field.
  - **Item 35** describes the taxpayer-information header: row 1 is the
    IIN (with the same trust-manager substitution rule already established
    for the parent form and every sibling schedule); row 2 is the tax
    period.
  - **Item 36** describes the "Информация о КИК и ПУ КИК" table,
    column by column (sub-items 1 through 15, columns A through O, with
    column I further broken into ten sub-columns I-1 through I-10 per
    subparagraphs 1)-10) of paragraph 5 of Article 335 of the Tax Code).
    Full detail is in each field's own `description` in `schema.json`. Two
    closing carry-over instructions, given directly after sub-item 15 and
    not modelled as separate fields (consistent with this registry's
    established practice of disclosing rather than duplicating derived
    cross-schedule totals): "Итоговое значение графы L переносится в
    строку 220.01.045" (the total of column L is carried to line 220.01.045
    of `kz/kgd/individual-income-tax-declaration-schedule-220-01`) and
    "Итоговое значение графы O переносится в строку 220.01.058 I" (the
    total of column O is carried to line 220.01.058 I of the same
    schedule) — both disclosed in the relevant fields' own descriptions.

### External classifiers not modelled as enums

- **Column C (country code)** and **column F (currency code)** both cite
  Items 55 and 56 of the same Rules document (found immediately after this
  schedule's own chapter, within the shared 220-series codes appendix used
  across multiple 220.0X schedules): Item 55 defines the currency code per
  Annex 23 "Классификатор валют" and Item 56 defines the country code per
  Annex 22 "Классификатор стран мира", both annexes to Customs Union
  Commission Decision No. 378 of 20 September 2010 — the **same external
  classifier** already correctly cited (as an unconstrained/pattern string,
  not a fabricated enum) in the GOV-3551 cycle's own
  `kz/kgd/individual-income-tax-declaration-schedule-220-04` schema. Neither
  classifier's own contents are reproduced inline in this Order's text, so
  both fields are modelled here as plain 3-digit-numeric-pattern strings
  (`^[0-9]{3}$`), matching Form 220.04's own established pattern, not as
  enums.
- **Column B's** own definitional cross-reference (Article 332 of the Tax
  Code, defining КИК/ПУ КИК) and **column E's** own calculation-method
  cross-reference (paragraph 8 of Article 335 of the Tax Code) are likewise
  external statutory references not reproduced inline in this Order's text.
  Disclosed in the relevant fields' own descriptions; not modelled as
  constrained fields.
- **Column E (participation/control coefficient)** is modelled as a number
  with `minimum: 0, maximum: 100`, treating it as a percentage — a
  reasonable, low-risk numeric bound (not a fabricated classifier list)
  consistent with how this registry models other percentage-shaped fields
  elsewhere in the registry (e.g. `mn/gasr/state-registration-limited-liability-company`).
  The exact box/decimal format was not directly image-confirmed this cycle
  (it would have appeared on the un-fetched image 182), so this bound
  should be treated as a reasonable inference, not an image-verified fact.

### documentRef citation

- This schema cites **"Приложение 9 к приказу ... — форма 220.06"**,
  matching Form 220.00/220.01's own already-correct citation, per the
  GOV-3558 cycle's own independently re-derived and cross-checked
  conclusion (the enacting clause's Item 9 assigns Appendix 9 to Form
  220.00 and all ten of its companion schedules as one combined appendix).
  This cycle did not repeat that full re-derivation from scratch — it
  relies on the GOV-3558 cycle's own already-independently-verified
  finding, and confirms it is **not** continuing the increment-by-one
  "Приложение 10/11/12" pattern already confirmed as a citation bug in the
  merged Forms 220.02/220.03/220.04 schemas (open follow-up **GOV-3562**,
  still unresolved as of this cycle).

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.06 in full** — its six
printed pages, the taxpayer-identification header (repeated per sheet, with
a sheet-numbering box), and all 18 individual CFC/PE-entry rows across
columns B through O. Explicitly out of scope, and disclosed rather than
silently omitted:

- **The four other remaining companion schedules** (Forms 220.07 through
  220.10) remain open, disclosed backlog for future companion schemas — see
  the parent Form 220.00 schema's own VERIFICATION.md for each remaining
  schedule's page count and subject matter.
- **Images 182 (стр.01) and 183 (стр.02) were not independently
  image-confirmed this cycle**, due to a live site outage on the
  image-serving endpoint that persisted throughout this cycle's session.
  Columns B through I(main) are transcribed from the Order's own Rules text
  and a strongly-corroborated structural pattern, not a direct image read.
  A future cycle should re-confirm these two pages once the endpoint
  recovers.
- **Article 332, Article 334, Article 335, Article 339, and Article 346 of
  the Tax Code** — all referenced by this form's own Rules text for
  definitions, exemption conditions, and calculation methods — were not
  independently examined this cycle. None of their own inline lists or
  enumerations are reproduced or guessed at in this schema.
- **Annex 22 ("Классификатор стран мира") and Annex 23 ("Классификатор
  валют") to Customs Union Commission Decision No. 378** are referenced by
  column C and column F respectively but not reproduced inline — both
  fields remain 3-digit-numeric-pattern strings, not enums.
- **The two cross-schedule carry-over instructions** (column L's total to
  line 220.01.045; column O's total to line 220.01.058 I, both on
  `kz/kgd/individual-income-tax-declaration-schedule-220-01`) are disclosed
  in the relevant fields' own descriptions but not separately modelled as
  derived fields.
- **The trustee-filing substitution rule** (Item 35: if a trust manager
  performs the tax obligation, line 1 shows the trust manager's own IIN) is
  disclosed in the `iin` field's description but not separately modelled.
- **The Приложение-9-vs-10/11/12 `documentRef` discrepancy** in the
  already-merged Forms 220.02/220.03/220.04 schemas remains open follow-up
  **GOV-3562**; not addressed by this cycle.

## Conformance fixtures

12 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-06/1.0.0/`:
2 valid submissions (one with only the three header fields populated —
`iin`, `taxPeriodYear`, and `currentSheetNumber`; one fuller filing
populating entry row 1 across all 24 of its columns, including all ten
I-1 through I-10 reduction sub-columns) and 10 mutation-control fixtures
(each expected to raise exactly 1 error): a missing required `iin`, a
missing required `taxPeriodYear`, an invalid `iin` pattern (wrong digit
count), an invalid `taxPeriodYear` type (string instead of integer), an
invalid `entry1CountryCode` pattern (wrong digit count), an invalid
`entry1CurrencyCode` pattern (wrong digit count), an invalid
`entry1ParticipationCoefficient` value (above the 100 maximum), an invalid
`entry1ForeignProfitAmount` type (string instead of number), a negative
`entry1TaxCreditAmount` (violating the `minimum: 0` constraint), and an
unknown field not defined anywhere in this schema. All 12 were checked with
a from-scratch, throwaway Node mock validator implementing this schema's
own `required`/`validation` rules (not committed, per this registry's
established per-cycle practice). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass with this schema added — see the PR
description for the exact pass count.

## Known gaps

- Forms 220.07 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for
  each remaining schedule's page count and subject matter.
- Images 182 and 183 (this schedule's own стр.01 and стр.02) were not
  independently image-confirmed this cycle due to a live site outage;
  columns B through I(main) rest on the Order's own Rules text and a
  strongly-corroborated structural-pattern inference rather than a direct
  image read.
- Articles 332, 334, 335, 339, and 346 of the Tax Code, and Annexes 22 and
  23 to Customs Union Commission Decision No. 378, were not independently
  examined this cycle; none of their own contents are reproduced or guessed
  at in this schema.
- The Приложение-9-vs-10/11/12 `documentRef` discrepancy in the
  already-merged Forms 220.02/220.03/220.04 schemas was found by the
  GOV-3558 cycle and remains open follow-up GOV-3562; not addressed by this
  cycle.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened
  this cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images 184-187, fetched fresh this cycle, plus the Order's
own HTML Rules text, Items 34-36, also fetched fresh this cycle) and
transcribed its fields; images 182-183 were not independently visually
confirmed this cycle due to a live site outage and are instead inferred
from the Rules text and a strongly corroborated structural pattern across
the confirmed pages, as disclosed above. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
