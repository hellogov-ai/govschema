# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-05` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3558**), deepening
Kazakhstan's Taxes vertical by authoring the fifth of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.05, the
loss-accounting schedule the GOV-3551 cycle's own Form 220.04 boundary check
had already located (image 181, "distinct `Раздел. Показатели` layout headed
`Форма 220.05`").

## Why this candidate

CATALOG.md's own "Genuinely open, well-sourced candidates" section disclosed
six remaining companion schedules (Forms 220.05-220.10) as open backlog after
the GOV-3551 cycle authored Form 220.04. Given the disclosed, pre-located
Form 220.0X backlog remained open and exact, this cycle deepened it directly
rather than re-scouting new ground — the same preference this registry's
routine already establishes, and the same schedule series the
GOV-3484/GOV-3506/GOV-3544/GOV-3551 cycles already advanced four times.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 and Forms 220.01-220.04 schemas source.
  - **URL (directly re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note — a genuine live outage hit this cycle, distinct from the
    already-documented TLS quirk:** the domain's TLS-certificate-chain
    quirk (already documented in the GOV-3459/GOV-3477/GOV-3484/GOV-3506/
    GOV-3544/GOV-3551 cycles) remains a non-issue with `curl -k`. However,
    this cycle's live re-fetch of the **image-serving path**
    (`/rus/docs/V2500037390/files/1576/49/*.jpg`) consistently returned
    **HTTP 404** for every image tried — including images already known to
    exist and already published (179.jpg, 184.jpg) — with a response body
    that is the site's own template page containing the banner "Ведутся
    технические работы. Для поиска НПА просим перейти по ссылке" ("Technical
    maintenance work is underway. To search regulatory acts please follow
    the link"). This was re-tried repeatedly (with plain `curl -k`, with a
    fresh cookie/session, with a browser-like `User-Agent`/`Referer`, and
    after several delays) over roughly 30 minutes and never recovered during
    this cycle's session — a transient, site-wide maintenance outage on the
    image endpoint, not evidence the files were moved, renumbered, or
    removed. (The main document HTML page itself, at the URL above, stayed
    up throughout and was successfully re-fetched fresh.)
  - **File identity confirmed via salvaged same-day cache, not a fresh fetch
    this cycle:** because of the live outage above, this cycle could not
    obtain a fresh HTTP 200 for image 181.jpg. Instead it located and reused
    byte-identical copies of images 178.jpg-181.jpg already fetched fresh
    the same calendar day by the immediately preceding GOV-3551 (authoring)
    and GOV-3554 (review-gate) cycles, cached at `/tmp/kz22004/` and
    `/tmp/gov3554-verify/` respectively before the outage began. Both cached
    copies of each file are byte-identical to each other and their sha256
    hashes match the values already disclosed in
    `kz/kgd/individual-income-tax-declaration-schedule-220-04/1.0.0/VERIFICATION.md`:
    - `178.jpg` sha256: `f5d534500479a8b5c06f0b93c1e3145b59d3ff2941513d99e8ae2b292f7c900e`
    - `179.jpg` sha256: `daebdfc2f6dcc5a9761dc962a5d71def890f3c1e0a07e30e7bd8efd6ee1168e0`
    - `180.jpg` sha256: `fc43618c0f84af9b4b6550b4f119c18e1bf189d70d847a25131fcd684dbea091`
    - `181.jpg` sha256: `4aa00e5969bfb031ffea6026b57439f6ba15f9b5ec58e486f8831781383cbe20`
    These hashes matching an already-published, independently-derived record
    from a different cycle's own fresh fetch is treated as strong
    corroboration of authenticity, but this cycle is explicit that it is
    reusing a salvaged cache, not a fresh live fetch, for the image bytes
    themselves — unlike every prior Form 220.0X cycle, which did fetch its
    own images fresh.
  - **Image 181.jpg read visually** at native and zoomed (3x-8x, via the
    `sharp` npm package reused from `/tmp/kz22004/node_modules`, cropped per
    section) resolution.
  - **Boundary check, near end:** image `181.jpg`'s own printed header reads,
    directly and unambiguously ("форма 220.05 стр. 01"): title "УЧЕТ
    УБЫТКОВ" (loss accounting), subtitle "(Приложение 5 к Декларации)"
    (Appendix 5 to the Declaration — the form's own internal numbering
    relative to Form 220.00, distinct from the Order's own appendix
    numbering discussed below). No "стр. 02" appears anywhere, and no
    second image was needed to complete the table — the whole schedule fits
    on this one page, matching the parent Form 220.00 schema's own disclosed
    page-count estimate ("220.05 (loss accounting) — image 181, 1 page").
  - **Boundary check, far end — not independently re-confirmed by a fresh
    image read this cycle, due to the live outage above.** This cycle could
    not fetch image 182.jpg (repeated attempts, same 404/maintenance
    response) to visually confirm it shows a distinct "Форма 220.06" layout.
    The far-end boundary instead rests on two sources independent of the
    image fetch: (1) the parent Form 220.00 schema's own disclosed estimate,
    which already placed Form 220.06 (controlled-foreign-company taxation)
    at images 182-187; and (2) the Order's own Rules text (see below), whose
    Глава 7 (Form 220.05's own chapter) ends cleanly with Item 33(4) and is
    immediately followed by Глава 8 ("Пояснение по составлению формы
    220.06 – Налогообложение финансовой прибыли контролируемой иностранной
    компании"), with no further 220.05-related content in between. This is
    disclosed as a real, if lower-confidence, gap in this cycle's own
    verification — a future cycle authoring Form 220.06 should independently
    re-confirm image 182 once the site's image endpoint recovers, rather
    than treat this cycle's reasoning as sufficient on its own.
  - **Row-count determination:** the "Раздел. Показатели" table's row count
    was confirmed two independent ways: (1) a direct visual count of a
    zoomed crop of column A's row-number boxes, counting 11 distinct
    4-digit boxes with a blank, box-free margin below the 11th row extending
    to the page's own footer barcode; (2) a pixel-luminance scan down
    column A's box area (a small Node script reading raw pixel data via
    `sharp`), detecting 11 evenly-pitched (~23-24px) row-top border
    positions, consistent with the visual count and with no further row
    detected in the blank margin below. **Unlike Forms 220.01-220.04, this
    schedule has no separate printed grand-total ("ИТОГО") row** — both the
    pixel scan and the Rules text (Item 33, which describes only columns
    A-D uniformly, with no total-row instruction or cross-form carry-over
    language) agree on this.
  - **Extraction method:** every column was read directly off the rendered
    page image at zoom. Column A ("№") is 4 boxed digits — a row-ordinal
    control, not applicant data, per the same established convention as
    Forms 220.00-220.04 (row identity expressed by field-name ordinal
    `entry1`...`entry11`, not a separate row-number field). Column B ("Вид
    убытка") is a single wide text/selector field, not boxed digits — no
    fixed digit count was observed, consistent with modelling it as an
    unconstrained string. Column C ("период возникновения") is 4 boxed
    digits, the same box count and visual style as the header's own
    `taxPeriodYear` field, consistent with modelling it as an integer year.
    Column D ("Сумма") is a boxed money field with the same трлн/млрд/млн/
    тыс (trillion/billion/million/thousand) place-value group labels already
    established for other Form 220.0X money fields.
  - **No sheet-numbering box on this page**, unlike Forms 220.03-220.04 —
    the header (Раздел. Общая информация о налогоплательщике) contains only
    two numbered items (1: ИИН; 2: Налоговый период... год), matching the
    Rules text's own Item 32, which likewise describes only these two
    header lines for this schedule. No `currentSheetNumber` field is
    modelled for this schema.

### Secondary source — the Order's own Rules text

- This cycle fetched and read the Order's own full HTML page text
  (`https://adilet.zan.kz/rus/docs/V2500037390`) and found **Глава 7.
  Пояснение по составлению формы 220.05 – Учет убытков** (Items 31-33) — the
  Ministry's own line-by-line instructions for this exact schedule,
  immediately following Item 30's closing carry-over instructions for Form
  220.04 and immediately preceding Глава 8 (Form 220.06).
  - **Item 31** states the schedule's purpose: "Приложение 'Учет убытков'
    (форма 220.05) предназначено для отражения информации по учету
    убытков." (intended to reflect information on loss accounting).
  - **Item 32** describes the taxpayer-information header: row 1 is the
    IIN (with the same trust-manager substitution rule already established
    for the parent form and sibling schedules — if a trust manager performs
    the tax obligation, this line shows the trust manager's own IIN
    instead); row 2 is the tax period.
  - **Item 33** describes the "Показатели" table, column by column: (1)
    column A is the row's sequential number; (2) column B is "вид убытка,
    предусмотренный главой 35 Налогового кодекса" (a type of loss provided
    for in Chapter 35 of the Tax Code) — **an external statutory reference,
    not enumerated inline anywhere in this Order's own text**, unlike Form
    220.04's income-type legend (Item 54(2)), which was fully inline. This
    cycle deliberately did **not** attempt to reconstruct or fabricate
    Chapter 35's own list of loss-type categories — that chapter's own text
    was not part of the source examined this cycle, and is disclosed as
    unverified rather than guessed at. Column B is therefore modelled as a
    plain, unconstrained `string`, per this registry's established
    discipline for undocumented external classifiers — a discipline this
    cycle deliberately leaned on rather than repeat the immediately
    preceding GOV-3551/GOV-3554 cycle's own experience of an over-eager,
    initially-mis-cited enum. (3) column C is the tax period in which the
    loss subject to carryforward arose. (4) column D is the amount of the
    loss being carried forward. No total-row or cross-form carry-over
    instruction is given for this schedule, unlike Forms 220.01-220.04.

### Appendix-number citation — a discrepancy found in three already-merged sibling schemas

- While independently verifying this schedule's own `source.documentRef`,
  this cycle re-derived the Order's own enacting clause (the opening
  "ПРИКАЗЫВАЮ: 1. Утвердить: ..." numbered list, which assigns one
  Приложение number to each of the ~20+ tax-form/rules bundles this single
  Order approves) and cross-checked it against the HTML content stream's own
  "Приложение N к приказу ... № 695" headers.
  - The enacting clause's own **Item 9** reads: "форму декларации по
    индивидуальному подоходному налогу (форма 220.00) с пояснением по ее
    составлению согласно приложению 9 к настоящему приказу" — i.e.
    **Приложение 9 = Form 220.00, with its explanation** (which, per the
    schedule's own structure, includes all ten of its companion schedules
    220.01-220.10 as sub-parts of the same declaration package — there is no
    separate enacting-clause item for any individual 220.0X schedule).
  - The HTML content stream's own **"Приложение 9 к приказу ... № 695"**
    header appears **exactly once** in the entire ~2.66 MB document, and
    immediately precedes the entire scanned-image bundle spanning Form
    220.00 through Form 220.10 (images 170-194 inclusive) — confirmed by
    checking that every image in this range (170, 171, ..., 184, etc.) has
    this single header, and no other, as its nearest preceding "Приложение
    N" occurrence.
  - This matches and corroborates `kz/kgd/individual-income-tax-declaration`'s
    own existing `documentRef` ("Приложение 9 ... — форма 220.00") and
    `kz/kgd/individual-income-tax-declaration-schedule-220-01`'s own existing
    `documentRef` ("Приложение 9 ... — форма 220.01") — both already correct.
  - **However**, the merged schemas for Forms 220.02, 220.03, and 220.04 each
    cite a different, sequentially-incremented appendix number instead
    (`documentRef` values "Приложение 10", "Приложение 11", and "Приложение
    12" respectively). This cycle's re-derivation could **not** confirm any
    of those three as contiguous with those schedules' own images: the
    enacting clause's own **Item 10** names Приложение 10 as Form **250.00**
    (декларация об активах и обязательствах физического лица — an
    individual assets/liabilities declaration, unrelated to Form 220.02);
    **Item 11** names Приложение 11 as Form **270.00**; **Item 12** names
    Приложение 12 as Form **300.00** (VAT declaration) — three entirely
    different forms, each appearing much later in the document (positions
    837718, 882022, and 997839 respectively in the raw HTML), well after
    the entire 220-series image bundle (which ends at image 194, long
    before those positions) has already concluded.
  - This looks like a same-shape "next sequential Приложение N" citation
    error — the same general class of mistake the GOV-3554 review gate
    already caught once this week for a legend Item number, but here for
    the `documentRef` field instead, and carried through three already
    -merged PRs (#583 for 220.02, #588 for 220.03, #589 for 220.04) without
    being caught by any review gate so far.
  - **This cycle's own schema cites the re-derived, cross-checked
    "Приложение 9"** (matching Form 220.00/220.01's own correct citations)
    rather than continuing the increment-by-one pattern that would suggest
    "Приложение 13". This discrepancy is flagged here explicitly for
    independent review — this cycle does not attempt to fix the three
    already-merged sibling schemas' citations, only to avoid repeating the
    same mistake in its own new document.

### Form convention confirmed

- **No grand-total row** — a genuine structural difference from Forms
  220.01-220.04, confirmed by both the pixel scan and the Rules text (see
  above).
- **No sheet-numbering box** — a genuine structural difference from Forms
  220.03-220.04, likewise confirmed by both the image and the Rules text.
- **Column A ("№", 4 boxed digits)** is a row-ordinal control, not applicant
  data, per the same established convention as Forms 220.00-220.04.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.05 in full** — its single
page, the taxpayer-identification header, and all 11 individual loss-entry
rows (each with loss type, the tax period the loss arose in, and the
carried-forward amount). Explicitly out of scope, and disclosed rather than
silently omitted:

- **The five other remaining companion schedules** (Forms 220.06 through
  220.10) remain open, disclosed backlog for future companion schemas — see
  the parent Form 220.00 schema's own VERIFICATION.md for each remaining
  schedule's page count and subject matter.
- **Chapter 35 of the Tax Code's own list of loss-type categories.** Column
  B (`entryNLossType`) references this chapter by number only; its own text
  was not examined this cycle and is not reproduced or guessed at. Modelled
  as an unconstrained `string`, not an `enum`.
- **The trustee-filing substitution rule** (Item 32: if a trust manager
  performs the tax obligation, line 1 shows the trust manager's own IIN) is
  disclosed in the `iin` field's description but not separately modelled —
  the field itself is unchanged either way.
- **Far-end boundary re-confirmation (image 182, Form 220.06)** was not
  independently re-derived this cycle due to the live image-endpoint
  outage — see "Boundary check, far end" above. A future GOV-3558+1 cycle
  authoring Form 220.06 should re-confirm this fresh.

## Conformance fixtures

12 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-05/1.0.0/`:
2 valid submissions (one with only the two required header fields
populated; one fuller filing populating three individual loss-entry rows
across loss type, period, and amount) and 10 mutation-control fixtures (each
expected to raise exactly 1 error): a missing required `iin`, a missing
required `taxPeriodYear`, an invalid `iin` pattern (wrong digit count), an
invalid `taxPeriodYear` type (string instead of integer), an invalid
`entry1LossPeriodYear` type (string instead of integer), an invalid
`entry1LossAmount` type (string instead of number), a negative
`entry1LossAmount` (violating the `minimum: 0` constraint), an invalid
`entry1LossType` type (number instead of string), a wrong-type `iin` (number
instead of string), and an unknown field not defined anywhere in this
schema. All 12 were checked with a from-scratch, throwaway Node mock
validator implementing this schema's own `required`/`validation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass with this schema
added — see the PR description for the exact pass count.

## Known gaps

- Forms 220.06 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- The far-end boundary against Form 220.06 (image 182) was not independently
  re-confirmed this cycle by a fresh image read, due to a live site outage —
  see above.
- Chapter 35 of the Tax Code's own loss-type categories were not examined
  this cycle; `entryNLossType` remains an unconstrained string.
- The Приложение-9-vs-10/11/12 documentRef discrepancy in the already-merged
  Forms 220.02/220.03/220.04 schemas was found and flagged this cycle but
  not corrected — that would require separate follow-up issues against
  those already-published documents.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as a scanned page image, salvaged from a same-day cache due to a live site
outage rather than fetched fresh, plus this cycle's own fresh read of the
Order's HTML Rules text) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
