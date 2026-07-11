# Verification record — fi/vero/50a-earned-income-and-deductions@1.0.0

## Candidate selection

This session's brief (GOV-2308, a child of the recurring "GovSchema Standard
Research" routine GOV-2306) named Vero's (Verohallinto, Finnish Tax
Administration) form 3023e, "50A — Earned income and deductions", as an
already-scouted, confirmed-strong candidate to close Finland's Taxes
vertical (5th of 6; Finland already had Visa via `fi/migri`, Business
Formation via `fi/prh`, National ID via `fi/dvv`, and Passport). Only DMV
remains open for Finland, already confirmed weak/gated (in-person/online-
only, no downloadable form) in a prior cycle and not re-attempted here.

## Source and fetch

- **URL:** `https://www.vero.fi/contentassets/23a6d90331ae408e84959d44a99dc45d/3023ev25_ws.pdf`
- Fetched fresh this session with a plain `curl` GET: **HTTP 200**,
  **233,558 bytes**, **SHA-256
  `d9c1c1141be4e7ead1a464bd2ddb6ee48498b00cbf9cc1077447727ee3343608`** —
  reproducing (independently, from scratch) the exact byte count and hash
  already cited in this cycle's brief. Confirmed genuine `%PDF-1.7` (header
  bytes verified directly), 4 pages, no login/CAPTCHA/WAF gate.
- Footer edition: `VEROH 3023e 1.2025`.
- This is Vero's own English-language fillable AcroForm PDF; no separate
  English guide page for form 50A/3023e could be located on vero.fi (the
  obvious guessed URL 404s and a site-search fetch surfaced no matching
  page), so this schema's field labels are drawn entirely from the PDF's own
  printed English text and `alternativeText` tooltips, which are already
  thorough enough that no Finnish-to-English decoding step was needed for
  ordinary fields (unlike this registry's `fi/migri` precedent).

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.js`, CommonJS require, reused from a cached
scratch `node_modules`) was used two ways, cross-referenced against each
other:

1. `doc.getFieldObjects()` — returned **127 distinct field names** across
   **141 total field-object array entries**. 6 of those entries are
   non-terminal placeholder nodes carrying `page: -1` and no `rect`
   (field names `"8"`, `"010"`, `"053"`, `"262;1"`, `"262;2"`, `"262;3"`) —
   an extra bookkeeping entry pdfjs emits alongside a field's real per-page
   widget(s) whenever that field has more than one underlying widget
   (a field repeated across multiple pages, or a same-named checkbox pair).
2. `page.getAnnotations({intent:'display'})` + `page.getTextContent()`,
   run across all 4 pages — returned **135 real, rendered `/Widget`
   annotations**: **115 `Tx` (text)**, **17 `Btn` checkbox** (all
   `radioButton: false`, confirmed by inspecting every one directly — this
   specimen has **0 genuine PDF radio-button groups** despite several
   same-named checkbox pairs behaving like one, see below), and **3 `Btn`
   push-buttons** (`Tulosta`/Print, `Sivulle 1`/To-first-page,
   `Tyhjenna`/Reset) excluded as non-data-collecting UI chrome. **0 `Ch`
   (choice) fields.**

Reconciling the two: of the 127 distinct field names, 126 have at least one
real widget; the 127th (`"8"`) has **zero** real widgets anywhere on any
page — a genuine dead/orphan AcroForm field entry, disclosed below rather
than silently mapped to nothing. 135 (real widgets) − 3 (excluded
push-buttons) = **132 substantive widgets**, every one of which is mapped
to exactly one `fields[]` entry (below); 132 − 40 widgets consolidated away
by merging (see next section) = **92 `fields[]` entries**.

A disposable reconciliation script (`/tmp/gov2308/reconcile.cjs`, not
committed) built an explicit widget-name → schema-field-name map and
asserted: zero unmapped substantive widgets, zero schema fields with no
backing widget, and every `MAP` entry corresponds to a real annotation.
Result: **132/132 substantive widgets accounted for, 92/92 schema fields
backed, 0 errors.**

## Consolidation decisions

1. **Two repeated-header fields merged 4-widgets-into-1.** `personalIdentityCode`
   (source field `"010"`) and `taxYear` (source field `"053"`) are each
   printed as an identical-looking widget on all 4 pages (a convenience so
   the filer doesn't have to re-enter them per page), but each is genuinely
   **one AcroForm field name** with 4 widget kids sharing one value — not 4
   independent per-page values. Modelled as one logical field each. (Saves
   6 widgets: 2 fields × (4 widgets − 1).)
2. **31 visually-split euro-box + cent-box amount pairs merged into one
   decimal `number` field each** (e.g. `"411;1"` + `"s411;1"` →
   `wages1GrossIncome`), per this registry's established split-widget
   consolidation convention (previously applied to split day/month/year
   groups; here applied to the equivalent split-currency-unit case). Saves
   31 widgets.
3. **3 same-named two-option checkbox pairs merged into one `enum` field
   each** — the three child-custody-type pairs (`"262;1"`, `"262;2"`,
   `"262;3"`, each with export values `"Joint custody "` / `"Sole custody "`
   sharing one field name per slot). Each pair reports `radioButton: false`
   (i.e. these are not PDF radio-button groups structurally), but they are
   genuinely the same AcroForm field name with two mutually-exclusive
   export values, matching this registry's "independent same-named
   checkboxes that are really one choice group" consolidation rule — not
   double-converted, since they are already same-named, not independently
   named. Saves 3 widgets.
4. **A coordinate cross-reference was required to correctly pair the three
   "8.1 special tax deduction" checkbox/cost-box rows**, because raw
   AcroForm field-name numeric order (`071`, `072`, `073`, `074`, `097`,
   `098`) does **not** match the visual row order of the three
   checkbox+cost pairs. Widget-rect y-overlap confirms: the "Illness"
   checkbox (`071`, y 348.1–361.0) pairs with cost box `072` (y
   351.1–371.7, overlapping); "Child's developmental disorder" (`097`, y
   324.2–337.2) pairs with cost box `098` (y 327.1–347.7, overlapping); and
   "Other reason" (`073`, y 300.2–313.2) pairs with cost box `074` (y
   303.2–323.9, overlapping) — i.e. the checkbox/cost pairs interleave
   rather than running in strict numeric sequence. An earlier draft of
   this document briefly mis-paired illness with `098` before this
   coordinate check was run; the corrected pairing is what ships here.
5. **Everything else is 1:1** — no other splitting or additional merging.
   In particular the four `employmentPeriodStartDate`/`EndDate` slot pairs
   (source `"091_1;N"`/`"091_2;N"`) are **not** merged: each is a distinct
   logical value (a period's start vs. end), each already a single
   `ddmmyyyy` text widget (`comb: false`, `maxLen: 10`) — not itself split
   across day/month/year boxes — so each remains its own `date` field.

## Bounded repeating-group flattening

Two sections use this registry's established bounded-repeating-group
convention (numbered slots, not unbounded arrays), matching the source
form's own printed layout:

- **Section 2 (Wages)**: 2 payor rows → `wages1*`/`wages2*` field prefixes.
- **Section 9 (Child support)**: 4 child-personal-identity-code slots →
  `childSupportChildPersonalIdCode1`–`4`.
- **Section 10 (Tax at source deduction)**: 4 employment-period slots →
  `employmentPeriodStartDate1`–`4` / `employmentPeriodEndDate1`–`4`.
- **Section 11 (Custody of children outside Finland)**: 3 child slots →
  `child1`–`3` `Name`/`DateOfBirth`/`CustodyEndDate`/`CustodyType`.

All slot fields are left independently optional (no `requiredWhen` chaining
one slot field on another slot field's presence), since there is no clean
boolean gate to condition on without risking this registry's documented
`notEquals`-against-an-optional-field bug (e.g. gating `child1DateOfBirth`
on `child1Name` `notEquals ""` would incorrectly evaluate `true` when
`child1Name` is genuinely absent). This matches this registry's precedent
for equivalent DK/FI bounded repeating groups.

## `documents[]`: deliberately absent

This schema has **zero** `documents[]` entries — unlike this registry's
other recent Finnish specimen (`fi/prh/start-up-notification-y1`, which has
a mandatory-enclosure appendix-form checklist). Form 3023e's own
introductory text on page 1 states explicitly: *"Do not enclose any
receipts or free-form clarifications with the form; place them somewhere
for safekeeping. The Tax Administration will ask you for the receipts, if
necessary."* There is no attachment checklist anywhere on the specimen to
model, so `documents` is omitted entirely (the meta-schema requires
`minItems: 1` when present, and there is nothing to include). This is
stated explicitly rather than left to be discovered: this registry's
`documents[]`-requiredness conformance-checker blind spot (confirmed on
multiple prior schemas) **does not apply to this document**, because there
is no `documents[]` array to have a blind spot about.

## `crossFieldValidation`

Four `compare` rules, one per employment-period slot:
`employmentPeriod{1,2,3,4}EndNotBeforeStart` — each asserting
`employmentPeriodEndDate{N}` `greaterThanOrEqual` `employmentPeriodStartDate{N}`.
Since all 8 fields involved are optional, the conformance-checker script
treats each rule as vacuously satisfied whenever either side of its pair is
absent (both fields must be present for the comparison to apply) — the
same interpretation a reasonable consuming agent would apply for an
optional-field date-ordering rule.

## Disclosed quirks on the specimen

1. **One genuinely dead/orphan AcroForm field** (`"8"`): a field name with
   zero real widgets on any page. It is not rendered, not fillable, and
   collects no data. Disclosed here rather than silently mapped to
   anything; excluded from `fields[]` entirely.
2. **Left-over Finnish text inside two otherwise-English internal AcroForm
   field names**: `otherEarnedIncomeType`'s underlying field name is
   `"6_Mika tulo"` (Finnish "mikä tulo", "what income"), and
   `donationRecipientName`'s underlying field name is `"8.6 Lahjoituksen
   saajan nimi"` (Finnish for "name of the donation recipient"). Both
   fields' printed on-page English labels are used for `label`/`description`;
   the Finnish internal names are internal-naming artifacts, not structural
   facts, and do not affect the field model.
3. **Inconsistent punctuation across one bounded-repeating-group's internal
   field names**: the four child-support personal-identity-code slots are
   internally named `"086,1"` (comma, slot 1) versus `"086;2"`, `"086;3"`,
   `"086;4"` (semicolon, slots 2–4) — a typo on the specimen itself. Purely
   cosmetic; all four slots are modelled identically as
   `childSupportChildPersonalIdCode1`–`4`.
4. **A terse, non-descriptive internal field name on a real data field**:
   `taxPaidAbroadOnFinnishPensionAmount`'s underlying AcroForm field names
   are the bare numeral `"1"` (euro box) and `"s1"` (cent box) — no
   semantic content at all, unlike almost every other field on this
   specimen. Confirmed via its `alternativeText` tooltip and surrounding
   printed text ("Crediting of tax paid abroad (reverse credit)" /
   "I have paid tax abroad on a pension I have received from Finland
   (see the instructions for completing the form)., euro") that this is a
   genuine amount field, not a stray checkbox or button.
5. **The specimen's own footer instructs it be printed, not photocopied**,
   for optical character recognition ("Only fill in forms printed out from
   tax.fi, do not use photocopies.") — descriptive context, not modelled as
   a field.

None of these quirks affect the correctness of the 92-field model; all are
disclosed rather than silently resolved.

## Mock conformance test run

Two scenarios were built under
`conformance/fi/vero/50a-earned-income-and-deductions/1.0.0/` and checked
with a disposable interpreter script (`/tmp/gov2308/check_conformance.cjs`,
not committed) walking `fields[]` (`required`/`requiredWhen`/`validation`)
and `crossFieldValidation[]` directly:

- **`wage-earner-with-union-dues.json`**: a simple wage-earner reporting one
  employer's wages, withholding tax, and statutory pension/unemployment
  contributions, plus union/unemployment-fund membership fees. **0 errors.**
- **`pension-benefits-expenses-and-child-support-full-coverage.json`**: a
  fuller scenario covering pension income, a benefit (unemployment
  allowance), a car-benefit private-use reduction claim (with its
  `requiredWhen`-gated km fields), work-related expenses, child support to
  2 children, a limited-tax-liability/A1-certificate cross-border
  declaration, one non-resident employment period, and one child-custody
  slot. **0 errors.**
- **Six mutation controls**, each derived from the minimal scenario (or the
  full scenario for the cross-field case) with exactly one defect
  introduced:
  1. drop required `filerName` → **1 error** (`missing-required`).
  2. drop required `personalIdentityCode` → **1 error**
     (`missing-required`).
  3. drop required `taxYear` → **1 error** (`missing-required`).
  4. drop required `signatureDate` → **1 error** (`missing-required`).
  5. set `carBenefitReductionPrivateUseClaimed: true` while omitting both
     `requiredWhen`-gated `carBenefitPrivateUseKm` and
     `carBenefitWorkRelatedUseKm` → **2 errors** (`missing-required` ×2,
     since both fields share the same `requiredWhen` gate — reported
     precisely as 2, not rounded to "1 error per mutation").
  6. reverse `employmentPeriodStartDate1`/`employmentPeriodEndDate1` so the
     end date precedes the start date → **1 error**
     (`cross-field-violation` on rule `employmentPeriod1EndNotBeforeStart`).

All six were correctly and individually flagged. This schema has **no**
`documents[]` array (see above), so no mutation control targets
`documents[]` requiredness — the absence is a structural fact about this
form, not an oversight, and is stated explicitly per this registry's
practice of always checking `documents[]` coverage rather than assuming
"0 errors" means it was exercised.

## Validation

- `node tools/validate.mjs`: passes, 352/352 documents (was 351/351 before
  this schema was added), 3/3 `mapping.json` companions.
- `node tools/validate-ajv.mjs` (after `npm ci --include=dev` in `tools/`
  to restore the `ajv`/`ajv-formats` devDependencies a plain `npm ci` can
  skip under a `NODE_ENV=production` environment): passes, 352/352
  documents against the v0.3 meta-schema, 3/3 `mapping.json` companions.

## Scope and jurisdiction notes

This document closes Finland's Taxes vertical (5 of 6). Only DMV remains
open for Finland, already confirmed weak/gated in a prior cycle (no
downloadable form; in-person/online-service-only) and intentionally not
re-attempted here. It does not submit the form on the filer's behalf; the
live source (vero.fi) is always authoritative. GovSchema is independent and
is not affiliated with, endorsed by, or operated by the Republic of Finland
or Verohallinto.
