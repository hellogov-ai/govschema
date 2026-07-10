# Verification record — `se/skatteverket/individual-income-tax-return` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Why this version exists (GOV-2096, "GovSchema Standard Research")

GOV-2091 authored this document's `1.0.0` with 48
granular per-box fields (§§1.1-9.2, 17, 18), citing
`.../howtofileyourtaxreturn/thecontentsoftheincometaxreturn.4.7be5268414bea064694c76b.html`
("The contents of the income tax return") as `source.url`.

GOV-2093 (the `1.0.0` review gate) independently
re-fetched that exact URL and found it is only nine short English-only
paragraphs, with no bilingual per-box breakdown and no mention of sections
17/18 at all. The correction (commit `8b2b85c`) was right to flag this and
rescoped `1.0.0` down to 14 aggregate fields citing only what that specific
URL genuinely contains. `1.0.0` remains published and correct for what it
claims — **it is not edited by this document**, consistent with
VERSIONING.md §3 (immutability: "once published, a version directory is
never edited or deleted").

Closing out GOV-2093, a follow-up review found the granular box-level
bilingual content the original `1.0.0` draft modelled is real, current,
official Skatteverket content — genuinely fetched via `curl` in the original
authoring session — but from a **different URL** than the one written into
`1.0.0`'s `source.url`:

`https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/declaringtaxesforindividuals/howtofileyourtaxreturn/incometaxreturn12026.4.5c281c7015abecc2e20911b.html`
("Income Tax Return 1, 2026")

That finding was filed as GOV-2096, a bounded,
low-priority backlog item with the correct URL already identified. This
document is that follow-up: it republishes the full granular field set at a
**new MAJOR version** (restructuring/renaming fields versus `1.0.0`'s
14-field aggregate model — a breaking change per VERSIONING.md §1), citing
the correct page.

## Sources examined (this session)

- **Document `(id, version)`:** `se/skatteverket/individual-income-tax-return` / `2.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Tax Agency (Skatteverket).
- **Primary source:** `https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/declaringtaxesforindividuals/howtofileyourtaxreturn/incometaxreturn12026.4.5c281c7015abecc2e20911b.html`
  ("Income Tax Return 1, 2026 (income year 2025)"). **Freshly re-fetched in
  this session** via `curl` with a browser `User-Agent` (HTTP 200, 137046
  bytes downloaded), tags stripped and text extracted programmatically (not
  summarized by a fetch tool). This is the **third independent live
  confirmation** of this exact URL/content: once during the original `1.0.0`
  authoring session (per GOV-2091's own VERIFICATION.md, though mis-cited
  there under a different URL), once during GOV-2093/GOV-2096 close-out, and
  once now for this `2.0.0` authoring session — all three found the identical
  bilingual box-by-box breakdown (Swedish original + Skatteverket's own
  official English translation) for every numbered box, sections 1 through
  18 (sections 10-16, the business-activity sections, are out of scope here —
  see "What is NOT modelled" below).
- **Corroborating sources:** the SKV 2000 order/distribution page and general
  Skatteverket guidance on pre-printed amounts and returns being mailed to
  the registered address (unchanged from `1.0.0`'s own corroborating
  sources).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer).

## Verbatim cross-check discipline

Every field's `sourceRef` in this version was mechanically cross-checked
against the freshly extracted page text (a disposable `/tmp` script, not
committed) by extracting each quoted substring from `sourceRef` and
confirming it appears verbatim (whitespace-normalized) in the extracted page.
This is a direct response to the GOV-2093 lesson: sourceRefs must quote only
text that genuinely exists on the cited page, not paraphrase or "clean up"
the source's own wording.

This check caught **9 fields** where the original `1.0.0`-draft-era
`sourceRef` text (recovered from pre-correction commit `e5d9057`) had
introduced small, non-fabricating but still real discrepancies against the
live page — added punctuation, curly-vs-straight quotes, or (in two cases)
silently "fixing" a typo the source itself makes (`propertyChargeBasisHouses`
and `propertyTaxBasisHousesUndevelopedPlots` — the source's English text
reads "owner-**ocupied**", missing a `c`; this version's `sourceRef` now
quotes that misspelling verbatim and says so explicitly, rather than quietly
correcting it). All 9 were patched to quote the live page exactly. One field
(`taxpayerAddress`) is intentionally *not* a page quote — same as `1.0.0`, it
cites general Skatteverket guidance, disclosed as such, not this numbered-box
page.

## What was confirmed against the source

Identical field-to-source mapping as `1.0.0`'s original (pre-correction)
draft — see the box-by-box table recovered from commit `e5d9057`'s
VERIFICATION.md for the full §1.1-18 breakdown. Every one of those 48 fields'
`sourceRef` now points at, and was re-verified against, the *correct* URL
above (not `1.0.0`'s cited URL).

## What is NOT independently confirmed / out of scope

Unchanged from `1.0.0`'s original scope decisions (all independently
re-confirmed this session against the live page):

- **Taxpayer identity header** (`taxpayerPersonalIdentityNumber`,
  `taxpayerName`, `taxpayerAddress`) is not itself enumerated on this
  numbered-box page; included and sourced to general Skatteverket guidance,
  disclosed as a materially weaker sourcing grain than the numbered boxes.
- **Sections 10-16** (Business activities, Interest allocation, Expansion
  funds tax, Reduction of social security contributions, General deductions
  for business, business-rental-property charge/tax) are deliberately not
  modelled — they apply only to filers who also run a sole-proprietorship
  business (referencing separate Forms NE/N3A) or own rental/industrial
  property, and reference further un-modelled K-annexes.
- **K-annexes themselves** (K4-K13, K15A/B) are not modelled; sections 7-8
  only capture the aggregate amounts those annexes feed into the main
  return.
- **Two threshold-gated deduction boxes** (`journeysToAndFromWork`,
  `otherWorkRelatedExpenses`) collect the total amount, not the
  already-reduced deduction, per the source's own "Fill in the total amount"
  instruction.
- **No PDF-level `Required` flags exist** (no fillable AcroForm; the source
  is an HTML translation page and the underlying physical form is
  personalized/pre-printed).
- **Live e-service parity** not screened.
- **Swedish personnummer format** validated against the general pattern, not
  a jurisdiction-specific checksum.

## A note on VERSIONING.md's immutability/deprecation tension

VERSIONING.md §3 states a published version directory is "never edited or
deleted," while its "Status interaction" subsection (under §1) states a
superseded version's `status` "may move to `deprecated`." This document
does **not** edit `1.0.0`'s `schema.json` — its bytes are left exactly as
published, per the immutability guarantee an agent pinning `(id, "1.0.0")`
relies on. The supersession relationship is instead recorded narratively in
`CATALOG.md`'s Executive Summary and Known Gaps sections. This is flagged as
a genuine spec-documentation ambiguity worth a small clarifying edit to
VERSIONING.md in a future cycle (e.g. clarifying that "status may move to
deprecated" refers to the registry's *catalog-level* tracking of a version's
lifecycle, not an edit to the immutable document itself, or introducing an
explicit `supersededBy` catalog mechanism) — not a decision this document
makes unilaterally.

## Test run

Reused `1.0.0`'s own mock scenario
(`conformance/se/skatteverket/individual-income-tax-return/2.0.0/application-packet.json`,
Anna Lindqvist, a Swedish resident employed by a single employer in
Gothenburg who owns her house, used RUT-eligible cleaning services, and holds
a small savings/investment account, with no foreign income or business
activity — content-identical to `1.0.0`'s packet, since the field set is a
superset covering the exact same scenario), re-checked with a fresh
from-scratch script (`/tmp/gov2096/check_conformance.mjs`, not committed — a
disposable checker, not registry tooling) that: (1) confirms every one of the
schema's 48 fields appears exactly once across
`collectedValues`/`notApplicableFields`; (2) confirms all effectively-required
fields (static `required` plus `requiredWhen`, gated by `visibleWhen`) are
collected; (3) confirms no not-applicable field is actually effectively
required given the collected values; (4) checks every collected value's
`pattern`/`minLength`/`maxLength`/`minimum`/`maximum`/`enum` constraint.
Result: **0 errors** across all 48 fields (14 collected, 34 correctly marked
not-applicable). Four mutation tests confirmed the checker actually catches
defects rather than passing vacuously: (1) removing the required
`taxpayerName` from `collectedValues` correctly raised 2 errors; (2) setting
`hasForeignIncome` to `true` while leaving
`foreignIncomeCategory`/`foreignIncomeCountry`/`foreignIncomeAmountSek`
not-applicable correctly raised 6 errors; (3) setting
`taxpayerPersonalIdentityNumber` to a non-personnummer string correctly
raised exactly 1 pattern-validation error. The schema was also validated
against the GovSchema v0.3 meta-schema with `tools/validate.mjs` and
`tools/validate-ajv.mjs`, and checked with `tools/verify-sources.mjs`.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
