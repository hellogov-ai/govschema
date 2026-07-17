# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-02` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3506**), deepening
Kazakhstan's Taxes vertical by authoring the second of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.02, the
fixed-asset deductions schedule the GOV-3484 cycle's own Form 220.01
VERIFICATION.md had already located and boundary-checked (image `176.jpg`,
confirmed there to be "Form 220.02 page 1").

## Why this candidate

CATALOG.md's own "Genuinely open, well-sourced candidates" section disclosed
all nine remaining companion schedules (Forms 220.02-220.10) as open backlog
after the GOV-3484 cycle authored Form 220.01. This cycle re-scanned
CATALOG.md fresh per the standing per-cycle routine, re-confirmed the four
named National ID candidates (DE Steuer-ID, SG NRIC, NZ RealMe, remaining
voter registration) are all still resolved, found every single-vertical-gap
jurisdiction's remaining vertical (BR/CH/MK/PL/SK Visa, GR/MN National ID,
RW Taxes) already a confirmed dead end, and picked this disclosed KZ Taxes
companion-schedule backlog item over scouting a fresh jurisdiction — the
same "deepen an open, well-sourced backlog item before scouting new ground"
preference this registry's routine already establishes.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 and Form 220.01 schemas source.
  - **URL (directly retrieved, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain in the GOV-3459/GOV-3477/
    GOV-3484 cycles (`openssl verify` code 21) — a server misconfiguration,
    not a real access gate.
  - **File identity confirmed:** Form 220.02 is embedded as two scanned page
    images, `/files/1576/49/{176,177}.jpg`, each independently re-fetched
    (`curl -k`, HTTP 200) this cycle and read visually — at native
    resolution first, then at 3x zoom (via the `sharp` npm package, cropped
    per section) to resolve small print in the multi-line label text and
    confirm no line item's own Roman-numeral sub-item was missed.
  - **Boundary check, both ends:** image `176.jpg`'s own printed header
    ("форма 220.02 стр. 01") directly states the form and page number, no
    inference needed. The following image, `178.jpg`, was fetched and
    confirmed to already be Form 220.03 page 1 ("ДОХОД, ПОДЛЕЖАЩИЙ
    ОСВОБОЖДЕНИЮ ОТ НАЛОГООБЛОЖЕНИЯ В СООТВЕТСТВИИ С МЕЖДУНАРОДНЫМИ
    ДОГОВОРАМИ"), confirming Form 220.02 is exactly two pages
    (176-177) — matching the page count the GOV-3477 cycle's own parent
    Form 220.00 VERIFICATION.md had already disclosed for this schedule
    ("220.02 (fixed-asset deductions) — images 176-177, 2 pages"). Unlike
    the GOV-3484 cycle's own Form 220.01 page-count correction, no
    correction was needed here — the prior disclosed estimate was already
    accurate.
  - **Extraction method:** every numbered line (220.02.001 through
    220.02.012) and every Roman-numeral sub-item was transcribed directly
    from the two page images, in printed order, cross-checked against the
    line numbering sequence to confirm no sub-item was skipped.

### Form convention confirmed

- **The four repeating column headers** printed above every amount grid on
  both pages (трн / млрд / млн / тыс — trillion / billion / million /
  thousand place-value groups) are the same single boxed-digit money-amount
  entry convention already confirmed for Form 220.01 and the parent Form
  220.00, not four independent values — every line/sub-item on this schedule
  is modelled as one `number` field in tenge.
- **Every numbered line except 220.02.012 splits into four Roman-numeral
  sub-items (I-IV)**, one per statutory fixed-asset group defined elsewhere
  in the Tax Code (the form page itself prints only the group numbers I-IV,
  never a legend of what each group designates — modelled honestly without
  inventing category labels not printed on the page, the same standard this
  registry applied to Form 220.01's own undocumented activity-type codes).
  Line 220.02.012 was confirmed at 3x zoom (bottom of page 177, just above
  the barcode) to print a single ungrouped amount box instead of the usual
  four-group breakdown — modelled as a lone field with no sub-items.
- No dropdown/select boxes (the "▾"-style icon Form 220.01 used for several
  external-classifier fields) appear anywhere on this schedule — every line
  is a plain boxed-digit amount entry.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.02 in full** — both of its
pages, the taxpayer-identification header (items 1-2), and every line item
(220.02.001-220.02.012) with all Roman-numeral group sub-items. Explicitly
out of scope, and disclosed rather than silently omitted:

- **The eight other companion schedules** (Forms 220.03 through 220.10)
  remain open, disclosed backlog for future companion schemas — see the
  parent Form 220.00 schema's own VERIFICATION.md for each remaining
  schedule's page count and subject matter.
- **The statutory fixed-asset group definitions (I-IV)** are not printed on
  this form page and are not modelled as an enum or classifier — see "Form
  convention confirmed" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-02/1.0.0/`:
2 valid submissions (0 errors each — one with only the two required header
fields populated, one fuller filing exercising all four statutory
fixed-asset groups across every line plus the ungrouped leased-asset line)
and 7 mutation-control fixtures (each expected to raise exactly 1 error): an
invalid `iin` pattern (wrong digit count), a missing required `iin`, a
missing required `taxPeriodYear`, an invalid `taxPeriodYear` type (string
instead of integer), a `fixedAssetValueBalanceOpening` below the valid 0
minimum, a `totalFixedAssetDeduction` given a string instead of a number, and
an unknown field not defined anywhere in this schema. All 9 were checked
with a from-scratch, throwaway Node mock validator implementing this
schema's own `required`/`validation` rules (not committed, per this
registry's established per-cycle practice). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 532/532 across the full registry with this
schema added.

## Known gaps

- Forms 220.03 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
