# GSP-0019: Generalize `edition.scheme` beyond `us-tax-year`/`gb-tax-year`

- **Status:** Proposed — not yet reviewed. Requires maintainer (Founding
  Engineer routing to CEO) sign-off, since §5.7's `edition.scheme` enum is a
  one-way-door surface per GSP-0005's own header.
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** [GOV-430](/GOV/issues/GOV-430) (GovSchema Standard Research —
  Taxes vertical gap-fill cycle)
- **Affects:** `spec/v0.3/govschema.schema.json` `$defs/edition.scheme` enum,
  SPEC.md §5.7 — a one-way-door surface (GSP-0005)

## Problem

While authoring `ie/revenue/self-assessment-tax-return-form11s` (Ireland's
Form 11S, a genuinely time-versioned annual return — Revenue reissues a
fresh edition every tax year, same shape as the already-supported UK SA100
and US 1040/4868/FAFSA), `edition.scheme` turned out to be a **closed enum**
with exactly three values: `us-tax-year`, `gb-tax-year`, `award-year`
(SPEC.md §5.7). None of these is correct for Ireland.

Structurally, Ireland's tax year is the plain calendar year — the same shape
as `us-tax-year` — but reusing that scheme name on an `IE` document would be
semantically misleading to any consumer that keys off `scheme` to infer
jurisdiction or fiscal-year boundaries (a real risk: `us-tax-year` implies
"this is a US document" to a casual reader of the raw JSON). Since GovSchema
is explicitly multi-jurisdictional from day one (`README.md`), and every
jurisdiction with an individual income-tax system will eventually need a
time-versioned return schema (Germany's Einkommensteuererklärung, Australia's
individual return, Canada's T1, New Zealand's IR3, Singapore's Form B/B1 —
all flagged as discovery candidates in this same GOV-430 cycle), the current
two-country-plus-one-purpose enum will keep colliding with each new
jurisdiction's tax-filing schema.

This is exactly the kind of one-way-door decision this document's author is
not authorized to make unilaterally (GovSchema charter, Standards Engineer
role boundary) — flagging it for maintainer review rather than extending the
enum in the same commit that needed it.

## Options considered

- **Option A — country-specific enum growth.** Add `ie-tax-year`,
  `de-tax-year`, `au-tax-year`, `ca-tax-year`, `nz-tax-year`, `sg-tax-year`,
  etc. as each jurisdiction's turn comes up (an additive spec MINOR each
  time, per §5.1's compatibility rule). Simple, consistent with the existing
  `us-tax-year`/`gb-tax-year` precedent, but commits the registry to an
  ever-growing enum and a spec MINOR bump per new jurisdiction purely to
  file a tax return.
- **Option B — shape-based generic schemes.** Replace the country-keyed
  values with a small, closed set of *fiscal-year shapes*: e.g.
  `calendar-tax-year` (tax year = calendar year — covers US, IE, DE, and
  others), `split-tax-year` (a year spanning two calendar years with a
  fixed cross-year start date — covers GB's 6 April-5 April year; would
  need a way to record the actual boundary, likely in `label` or a sibling
  member), and `award-year` unchanged (FAFSA-style, not a tax year at all).
  Fewer enum values overall, generalizes immediately to every
  not-yet-covered jurisdiction discovered so far, but is a **breaking
  rename** for the two schemas that already ship `us-tax-year`/`gb-tax-year`
  (`us/irs/*`, `gb/hmrc/self-assessment-tax-return-sa100`) — would need a
  migration note in VERSIONING.md even though those documents' own `version`
  need not bump (the `edition` shape, not the return's fields, changes).
- **Option C — open the enum.** Make `scheme` an open, source-defined slug
  (like `classification`, §6.5) instead of closed. Removes the growth
  problem entirely, but loses the closed-vocabulary property GSP-0005
  explicitly chose *because* "the vocabulary is closed... and extended only
  by an additive spec MINOR" — a deliberate one-way-door design decision
  this proposal should not casually reverse.

## Recommendation

Option A (least disruptive, no migration) as a near-term unblock — add
`ie-tax-year` (and, as each jurisdiction's own tax-filing schema is
authored, its own `<country>-tax-year` value) — with Option B flagged as a
longer-term cleanup worth a dedicated design discussion once enough
jurisdictions are covered to see the actual shape distribution (how many are
calendar-year vs. split-year), rather than guessing the generalization now
from two data points (`us-tax-year`, `gb-tax-year`).

## Status quo pending a decision

`ie/revenue/self-assessment-tax-return-form11s` v1.0.0 is published at the
**plain, non-edition** registry path
(`registry/ie/revenue/self-assessment-tax-return-form11s/1.0.0/schema.json`),
not the edition-axis path, so it does not block on this proposal landing.
This is recorded as a known compromise in that schema's `VERIFICATION.md`:
a future tax year will require a MAJOR version bump instead of a coexisting
edition until `edition.scheme` is extended.
