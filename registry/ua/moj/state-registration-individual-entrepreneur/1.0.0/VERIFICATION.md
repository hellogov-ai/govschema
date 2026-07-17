# Verification record — `ua/moj/state-registration-individual-entrepreneur` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle. Ukraine opens as this
registry's **73rd jurisdiction**, in the Business Formation vertical.

## Why this candidate

Ukraine's Ministry of Justice (Мін'юст) publishes the full set of unified
state-registration application forms — for legal entities, individual
entrepreneurs, and public formations — directly as downloadable `.xlsx` files
from its own official domain, `minjust.gov.ua`, with no login, CAPTCHA, or WAF
gate on the listing page itself. **Form 1** — "Заява щодо державної
реєстрації фізичної особи - підприємця" (Application for state registration
of a natural person as an individual entrepreneur, ФОП) — is the natural
entry-level Business Formation candidate: it is the simplest, most common
sole-trader registration path, and it was pre-identified as reachable by an
earlier scouting pass (confirmed as a valid xlsx/zip container, not
independently field-extracted). This cycle re-fetched the file independently,
hashed it, and extracted every field from it directly.

The Ministry's own listing page names ten further sibling forms (Form 2 legal
entity, Form 3 government-body legal entity, Forms 4/6/7/8 public
formations/associations, Form 5 separate subdivision, Forms 9/10
participant-share changes, Form 11 foreign-entity subdivision) — none simpler
than Form 1 for a first Business Formation schema, so Form 1 was authored
without needing to fall back to Form 2 (legal entity).

## Sources examined

### Primary source

- **Authority:** Міністерство юстиції України (Ministry of Justice of
  Ukraine) — official domain `minjust.gov.ua`.
- **Document — Form 1, "Заява щодо державної реєстрації фізичної особи -
  підприємця"**, in force since 1 May 2023, one of the unified state
  registration forms under Ukraine's Law "On State Registration of Legal
  Entities, Individual Entrepreneurs and Public Formations."
  - **Cited URL:** `https://minjust.gov.ua/files/general/2023/04/27/20230427144630-72.xlsx`
  - **Access note:** direct fetches to `minjust.gov.ua/files/...` returned
    HTTP 403 from this sandbox, tried with multiple User-Agent strings and a
    Referer header pointing at the listing page. The Wayback Machine holds a
    fresh crawl of the exact cited URL (snapshot timestamp `20260105124625`,
    HTTP 200), re-fetched fresh this cycle via
    `http://web.archive.org/web/20260105124625/https://minjust.gov.ua/files/general/2023/04/27/20230427144630-72.xlsx`.
  - **File identity:** 48,566 bytes,
    `sha256:ba992e920f266d12439177a72cfbb21b13ef6536f801fb3e8cc997f84b8488e9`,
    confirmed as a valid PK-zip/xlsx container (`50 4b 03 04` header bytes
    read directly).
  - **Extraction method:** no `unzip`/`pip`/`openpyxl` available in this
    sandbox. A from-scratch Node script walked the zip's local-file-header-
    delimited entries and inflated each DEFLATE-compressed payload with
    `zlib.inflateRawSync` — the same raw-DEFLATE technique this registry has
    used for PDF streams, generalized here to a zip container.
    `xl/workbook.xml` was inflated first and confirmed the workbook's four
    sheets are named `сторінка 1` / `сторінка 2` / `дод. сторінка 3` /
    `дод. сторінка 4` (page 1 / page 2 / additional page 3 / additional page
    4), matching the source form's own four-page structure.
    `xl/sharedStrings.xml` and each `xl/worksheets/sheet{1..4}.xml` were then
    inflated, and every populated cell decoded — resolving shared-string
    indices, and handling both self-closing (`<c .../>`) and content-bearing
    (`<c ...>...</c>`) cell elements (an early version of the extraction
    script conflated these two shapes, misaligning several cells; this was
    caught and fixed by cross-checking the raw XML for a sample row before
    trusting the dump). Every populated cell across all four sheets was read
    in full, in Ukrainian, in row order. No OCR or image-rendering step was
    needed since the source is native XML text, not a scanned image.

### Secondary source — the Ministry's own listing page

- **URL:** `https://minjust.gov.ua/m/formi-zayav-u-sferi-derjavnoi-reestratsii-yuridichnih-osib-fizichnih-osib-pidpriemtsiv-ta-gromadskih-formuvan`
- **Access note:** also 403'd on direct fetch; re-fetched via its own Wayback
  snapshot (timestamp `20260113030913`, HTTP 200), 37,729 bytes,
  `sha256:12f5e132f80b83d30adc83dc235f05dbbdbbd24ce04b09d21cce6e31dddbd488`.
- **Confirms:** the exact cited file is anchored under the text "Заява щодо
  державної реєстрації фізичної особи - підприємця (форма 1), діє з 01 травня
  2023 року" ("...Form 1, in force since 1 May 2023"), alongside ten sibling
  forms (Forms 2–11) for other registration-subject types — used to confirm
  Form 1 is the correct, simplest Business Formation candidate on this page,
  and to source `source.documentRef` and the schema's `title`/`description`
  wording.

### External references (well-documented national conventions, not read off the form's own blank cells)

- **РНОКПП (Registration Number of the Taxpayer's Registration Card):** a
  10-digit personal tax identifier under Ukraine's Law "On the State Register
  of Individual Taxpayers." Modelled as `^[0-9]{10}$` for
  `taxpayerRegistrationNumber`.
- **Ukrainian postal index (Ukrposhta):** a well-documented 5-digit national
  postal-code convention. Modelled as `^[0-9]{5}$` for `postalIndex` and
  `taxAddressPostalIndex`.
- **+380 phone prefix:** modelled directly from the form's own printed
  prefix-box cells (`+`, `3`, `8`, `0` as the first four cells of each phone
  field's character-position grid, confirmed in the raw cell dump), not from
  external convention alone, for `contactPhoneNumber`, `additionalPhoneOrFax`,
  and `submitterPhoneNumber` (`^\+380[0-9]{9}$`).

## Scope and disclosed boundaries

This schema is deliberately scoped to the **new-registration action**
(`registrationAction: new_registration`) — a natural person's initial state
registration as an individual entrepreneur. Explicitly out of scope, and
disclosed rather than silently omitted:

- **The inclusion/changes/termination registration actions** — page 1's four
  action checkboxes are modelled as a disclosed judgment-call enum (matching
  this registry's `kz/moj/state-registration-limited-liability-partnership`
  precedent for a shared multi-action form), but only `new_registration`'s
  downstream fields are modelled. The changes-specific checkboxes
  (surname/citizenship/passport/location/activity/contact/family-farm-
  document/authorized-person change), the registration-timeframe radio (24/6/2
  hours), and the pre-1-July-2004 legacy registration block all apply only to
  the changes/termination actions and are not modelled.
- **Page 3 — the repeating "person authorized to act" block** (за наявності —
  optional): the source form itself instructs that additional page-3 sheets
  are used when there are more authorized persons than fields on one page.
  Not modelled at all in this version.
- **Two source "or" fields, modelled as independently optional rather than an
  enforced choice:** GovSchema's `requiredWhen`/`crossFieldValidation` grammar
  has no unconditional "at least one of" construct (every `crossFieldValidation`
  rule requires either a `when` condition or a `compare`, per the meta-schema —
  there is no trigger-less shape). (1) "Реєстраційний номер облікової картки
  платника податків або паспортні дані" — `taxpayerRegistrationNumber` and
  `passportSeriesNumber` are both optional; the source's own printed note
  further restricts passport-data use to persons whose passport carries a
  religious-objection mark permitting payments by passport series/number. (2)
  Page 2's contact block prints "номер телефону та/або" immediately before the
  email-address field two rows later; `contactPhoneNumber` and `emailAddress`
  are both modelled as optional. Neither pair's real-world "at least one
  required" constraint is enforced by this schema.
- **`singleTaxRatePercent`'s uniform applicability across single-tax groups**
  is not further conditioned by the source form itself (the blank simply
  follows the group-selection field), so it is modelled `requiredWhen
  electsSimplifiedTaxSystem: true` without a per-group distinction, though in
  practice its relevance differs by group (fixed-amount groups 1–2 vs.
  percentage-of-income group 3).
- **Address sub-fields beyond `regionType`/`postalIndex`/`houseNumber`** —
  `oblastName` (conditioned on `regionType: oblast`), `districtName`,
  `settlementName`, `districtInSettlement`, `namedObjectName`, and
  `streetTypeAndName` are all modelled optional per the source form's own
  general note that "only the address particulars that actually exist for the
  given location are specified" (this note appears verbatim on both page 2 and
  page 4 of the source).

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/moj/state-registration-individual-entrepreneur/1.0.0/`: 2
valid submissions (0 errors each — one minimal, required-fields-only
submission with no tax-system election and no family farm; one fuller
submission with the family-farm declaration, VAT election, simplified-tax-
system election with an "other address" business location, and several
optional fields populated, exercising the `requiredWhen` branches) and 7
mutation-control fixtures (each expected to raise exactly 1 error): a missing
required `surname`, an invalid `contactPhoneNumber` pattern (wrong prefix),
an invalid `postalIndex` pattern (wrong digit count), an invalid
`regionType` enum value, a missing `oblastName` when `regionType` is
`oblast`, a missing `singleTaxPayerGroup` when `electsSimplifiedTaxSystem` is
`true`, and a `singleTaxRatePercent` above the valid 0-100 range. All 9 were
checked with a from-scratch, throwaway Node mock validator implementing this
schema's own `required`/`requiredWhen`/`validation` rules (not committed, per
this registry's established per-cycle practice). Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` pass at 533/533 across the full registry with
this schema added.

## Known gaps

- Ukraine's other verticals are open backlog, per this cycle's scouting pass:
  Visa (`https://mfa.gov.ua/storage/app/sites/1/2018-02-02-visapp-en.pdf`),
  Passport
  (`https://libya.mfa.gov.ua/storage/app/sites/121/imported_content/5e30694f7a7d6.pdf`,
  a consular mirror — a Wayback copy was truncated at 1MB and would need a
  fresh full fetch), and Taxes
  (`https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`)
  were all found STRONG (directly downloadable government-published forms).
  DMV and National ID were found weak in the same scouting pass. None of
  these were independently re-verified this cycle beyond the URLs disclosed.
- The inclusion/changes/termination registration actions, the page-3
  multi-authorized-person block, and the pre-1-July-2004 legacy block are all
  disclosed, open backlog for a future minor-version cycle — see "Scope and
  disclosed boundaries" above.
- Form 2 (legal entity registration, the sibling form on the same Ministry
  page) remains an open backlog candidate for a future cycle if a
  legal-entity-specific Business Formation schema is wanted alongside this
  sole-trader one.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(via its Wayback Machine mirror, since the live domain 403'd this sandbox's
direct fetches) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
