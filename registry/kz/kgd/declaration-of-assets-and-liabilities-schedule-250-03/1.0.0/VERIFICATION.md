# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-03` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

This is a `GovSchema Standard Research` cycle (**GOV-4071**), deepening
Kazakhstan's Taxes vertical by authoring the fourth of the six disclosed
companion schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043).

## Why this candidate

The GOV-4050 cycle sized all six schedules by field count from the schedule
page images themselves: 250.01 and 250.05 tied as the smallest two (~13 leaf
columns, 2 sections each); 250.02 and 250.04 the largest (~17-18 columns, 3
sections each); 250.03 and 250.06 in between (~14 columns, 2 sections each).
With 250.01, 250.05, and 250.02 already authored (GOV-4050, GOV-4057,
GOV-4064), this cycle re-scanned CATALOG.md's own Known Gaps entry for Form
250.00 fresh and picked 250.03 as the next natural candidate in the numbered
sequence — one of the two "in between" schedules remaining unauthored
(alongside 250.06), and the same choice the GOV-4050 cycle's own sizing note
would predict next.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00,
  250.00, 250.01, 250.02, and 250.05.
  - **URL:** `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Form 250.03 itself** is embedded as a single scanned page image,
    `/files/1576/49/199.jpg` (fetched via `curl -k`, HTTP 200, 137,704
    bytes), read directly at full resolution and via two zoomed/upscaled
    crops (one per section) to transcribe every column and row count
    precisely.
  - **Boundary check:** the page's own barcode (`2625003010009`) encodes
    "25003" — form 250.03 — consistent with the GOV-4043 cycle's own
    structure list, which independently identified `199.jpg` as Schedule
    250.03 (housing-construction equity participation and investment gold,
    items 05/06) when it first catalogued all eight page images of Appendix
    10.
  - **Access note:** this cycle also re-fetched the order's own full HTML
    document (`curl -k`, HTTP 200, 2,660,118 bytes) — the persistent HTTP
    504 the GOV-4057 cycle hit against this same endpoint did not recur —
    and read Глава 5 ("Составление формы 250.03", paragraphs 17-19) in full,
    cross-checking every column against its own prose description rather
    than relying on the image and its inline footnotes alone.

### Extraction method

Every field on Form 250.03 was transcribed directly from the page image, two
zoomed crops, and Глава 5's own prose, in column order:

- **Item 05, Раздел В** ("Сведения о долевом участии в жилищном
  строительстве, в том числе за пределами Республики Казахстан"): **four**
  blank entry rows (confirmed by direct visual count in the zoomed crop)
  above a worked example — columns A (row number), B (identification number
  of the person/developer, registered including outside Kazakhstan, party
  to the contract obligated to transfer ownership of a residential building
  or part of one — worked example "111111111111"), C (developer name —
  worked example "CONSTRUCTION COMPANY"), D (country code of the developer's
  registration, per the footnote's own two-letter classifier — worked
  example "CA"), E (location/address of the object under the contract —
  worked example "г. Торонто, ул. 184, дом 1, офис 10"), F (currency code of
  the money paid, per the footnote's own three-letter classifier — worked
  example "USD"), and G (total amount paid, printed as млрд/млн/тыс
  digit-box groups — worked example "10 000"). Глава 5 paragraph 18 adds a
  scope note not visible on the image itself: only official housing-
  construction equity-participation contracts are reported here —
  preliminary apartment-booking contracts, apartment-reservation contracts,
  investment contracts, and similar are explicitly excluded.
- **Item 06, Раздел В** ("Сведения о наличии инвестиционного золота"): the
  page reuses the heading "Раздел В" a second time for this distinct
  section (rather than a В.а)/В.б) sub-label or a fresh letter) — the same
  form-wide labelling convention the GOV-4057 cycle already confirmed is not
  a genuine ambiguity, since Глава 5's own prose (paragraph 17) names both
  sections distinctly by subject matter regardless of the shared on-page
  heading. **Five** blank entry rows (confirmed by direct visual count — one
  more than the housing-construction section on the same page) above a
  worked example — columns A (row number), B (weight of the investment
  gold — worked example "100000", see "Multi-box fields" below), C (country
  code of the gold's registration, per the footnote's own two-letter
  classifier — worked example "KZ"), D (currency code in which the gold was
  acquired, per the footnote's own three-letter classifier — worked example
  "KZT"), and E (value of the investment gold, printed as млрд/млн/тыс
  digit-box groups — worked example "1 000 000"). Глава 5 paragraph 19 gives
  no further breakdown of column B beyond "указывается вес инвестиционного
  золота" ("the weight of the investment gold is indicated").

### A genuine, disclosed within-page row-count difference

The housing-construction section (item 05) prints **four** blank entry rows;
the investment-gold section (item 06), on the same page, prints **five**.
Confirmed by direct visual count of each section independently rather than
assumed identical — the same kind of per-section row-count variation this
registry has already disclosed for Form 250.02 (three/three/two across its
three sections) and re-confirmed as a genuine, recurring form-design
characteristic of the 250.0X series rather than a one-off.

### Multi-box fields modelled as single number fields, and one genuinely unresolved multi-box field

- The amount/value columns (item 05 column G; item 06 column E) are printed
  as млрд/млн/тыс place-value digit-box groups, modelled as a single
  `number` field with `minimum: 0`, per this registry's established
  convention (already applied across the KZ 220.0X and 250.0X schedule
  series).
- The weight column (item 06 column B) is **not** modelled as a single
  number field, unlike the amount/value columns above — see "Disclosed
  judgment calls" below for the full reasoning.

## Disclosed judgment calls

- **Row count differs by section on the same page**: four rows for the
  housing-construction section (item 05), five rows for the investment-gold
  section (item 06) — confirmed by direct visual count of each section's own
  blank rows, not assumed uniform across the page or copied from a prior
  250.0X schedule's own row counts.
- **The investment-gold weight column (item 06, column B) prints three
  labelled 3-digit-box groups — "КГ." (kilograms), "Г." (grams), and "МГ."
  (milligrams) — followed by a fourth, unlabelled 3-digit-box group, for 12
  digit-boxes total.** The worked example ("100000") fills only the
  rightmost six boxes (the labelled "МГ." group plus the unlabelled fourth
  group), leaving "КГ." and "Г." blank. Глава 5 paragraph 19 gives no
  further breakdown beyond "указывается вес инвестиционного золота," so
  neither the image nor the order's own prose resolves whether the
  unlabelled fourth group is a continuation of "МГ." (giving a 6-digit
  milligram sub-value) or a distinct, unlabelled unit of its own. Modelled
  as three separate numeric fields — `investmentGoldEntryNWeightKg`,
  `WeightG`, and `WeightMg` — mapping the three labelled groups literally,
  each a 3-digit place per this registry's digit-box convention, with the
  unlabelled fourth group folded into `WeightMg`'s own description as an
  open, disclosed ambiguity rather than silently invented as a fourth field
  or assumed to be a straightforward continuation.
- **The investment-gold section's own country-code footnote reads "код
  страны регистрации инвестиционного золота"** ("country code of
  registration of the investment gold") — an unusual phrase for a physical
  commodity rather than a registered account or legal entity, since gold
  bullion has no country of "registration" in the way a bank account or a
  legal entity does. Transcribed verbatim into the field's own description
  rather than reinterpreted or silently corrected, consistent with this
  registry's practice of disclosing rather than resolving odd source
  wording.
- **Developer/institution identification number (item 05, column B)
  modelled as a free string with no pattern.** Unlike the IIN fields, the
  page does not print a footnote stating this identifier's format, and the
  worked example ("111111111111") is an illustrative registration number of
  a type this registry has no independent format citation for.
- **`currentSheetNumber`** modelled identically to Schedules 250.01, 250.02,
  and 250.05 — the same recurring top-right header box, optional integer, no
  stated upper bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.03, Schedule 3 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The other two remaining schedules** (Forms 250.04 and 250.06 —
  securities/derivatives/digital-assets/foreign-brokerage-accounts, and
  receivables-payables/trust property, respectively), each disclosed by the
  parent Form 250.00 schema's own VERIFICATION.md as separate, open backlog
  candidates for a future cycle. (Forms 250.01, 250.02, and 250.05 have
  already been authored.)
- **The parent declaration's own gating checkboxes**
  (`hasForeignConstructionParticipation`, `hasInvestmentGold`) that determine
  whether this schedule is filed at all — already modelled on
  `kz/kgd/declaration-of-assets-and-liabilities` itself, not duplicated here.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-03/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field and one fuller filing populating all four rows of the
housing-construction section and all five rows of the investment-gold
section) and 8 mutation fixtures (each expected to fail validation with
exactly 1 error): a missing required `iin`, an invalid `iin` pattern, an
invalid `representedPersonIin` pattern, an invalid `currentSheetNumber`
below its stated minimum, an invalid `housingConstructionEntry1CountryCode`
pattern, an invalid `investmentGoldEntry1CurrencyCode` pattern, an invalid
`investmentGoldEntry1WeightKg` below its stated minimum, and one
unknown-field rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` were run against every fixture listed above and
pass. GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
