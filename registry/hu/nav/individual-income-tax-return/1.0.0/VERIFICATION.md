# Verification record — hu/nav/individual-income-tax-return@1.0.0

## Candidate selection

GOV-4687 ("GovSchema Standard Research"). GOV-4638's parallel new-jurisdiction
scouting pass (Hungary, Belgium, Tunisia) banked Hungary's strongest candidate
as Taxes: "NAV's 24SZJA individual income-tax return, a genuine ~30-page blank
form (711KB) plus a matching field-by-field instruction guide (2.9MB), both
fetched unauthenticated from `nav.gov.hu`." This cycle first re-verified
Belgium's own banked Visa candidate (Belgium stood at 2/6, and this routine's
own standing preference is to close a vertical on an already-open jurisdiction
before opening a new one) — but a field-by-field comparison against this
registry's own `fr/france-visas/schengen-visa-application@1.0.0` found
Belgium's "national long-stay visa" PDF
(`cotedivoire.diplomatie.belgium.be/.../blancobelgianapplicationform-fr.pdf`)
is a field-for-field duplicate of the harmonized EU Schengen visa application
template (Annex I to Regulation (EC) No 810/2009), the same wall this
registry's own GOV-1774 precedent already hit for Poland, Spain, Portugal, and
Switzerland's own national D-visa forms. Not authoring a duplicate; Belgium's
Visa vertical is re-banked as a **confirmed duplicate, not an open gap** (see
the Known Gaps update below). With no non-duplicate strong candidate left for
an already-open jurisdiction this cycle, this cycle opens Hungary as a new
jurisdiction instead, using GOV-4638's own STRONG, uncaveated Taxes finding.

## Reaching the live source

`https://nav.gov.hu/pfile/file?path=/nyomtatvanyok/letoltesek/nyomtatvanykitolto_programok/nyomtatvanykitolto_programok_nav/24szja/24szja-nyomtatvanykep`

- Located via NAV's own download page for form 24SZJA,
  `nav.gov.hu/nyomtatvanyok/letoltesek/nyomtatvanykitolto_programok/nyomtatvanykitolto_programok_nav/24szja`,
  which links the blank/printable form ("24SZJA nyomtatványkép"), its
  completion guide ("24SZJA kitöltési útmutató", 2961 kB), and the ANYK
  fill-in program installers.
- Plain unauthenticated `curl` request, no session/cookie/CAPTCHA gate beyond
  ordinary session cookies NAV's web server sets on every request.
- HTTP 200, **727,940 bytes** retrieved — matching GOV-4638's own banked
  ~711KB estimate closely (the discrepancy is consistent with the estimate
  being taken from the page's rounded display value).
- PDF header `%PDF-1.4` at byte 0; confirmed via `pdfjs-dist`.
- sha256 of the retrieved bytes:
  `4a93c5ff84eada2bac6d8e8d5359c310407abfe142b3e370bcaae82e41a14116`.
- 30 pages, confirmed via `pdfjs-dist`'s `numPages`; 0 AcroForm widgets on
  every page (a flat, print-and-write specimen, not a fillable PDF).

### Authority attribution

The form's own header reads "Nemzeti Adó- és Vámhivatal" (National Tax and
Customs Administration, NAV) — Hungary's tax authority, per the hosting
domain's own organizational identity.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, loaded via
`legacy/build/pdf.js` through `createRequire` since no `.mjs` build is
vendored) `getTextContent()` read every text item's raw string and `x`/`y`
transform position per page. Unlike several recent non-Latin-script cycles,
this specimen's text layer decodes to correct, readable Hungarian text with
no glyph-scramble or glyph-paint-order artifact; the only correction needed
was sorting each page's items by descending `y` then ascending `x` to
reconstruct top-to-bottom, left-to-right reading order, since the raw
content-stream order interleaves label/value pairs and column groups (the
same class of reading-order artifact as `be/mobilit/vehicle-registration-application@1.0.0`,
though without any glyph-level corruption). No canvas render was needed —
the sorted text-item order was unambiguous and internally consistent with
this form's own well-documented public structure (row numbers 1-201 running
continuously across the specimen's sheets, each with a stable descriptive
label).

## Document structure

30 pages total. Page 1 is the cover sheet (24SZJA): submission-channel and
office-use boxes (excluded, not applicant-facing), taxpayer identification
(name, tax ID, birth name, mother's name, date/place of birth, sex, address,
phone), a code-box checklist of which companion detail sheets are attached
(excluded — pure cross-referencing bookkeeping for sheets not modelled),
return-nature marking (original/correction/self-revision, draft
acceptance), a refund/payment-routing block (full vs. partial refund,
domestic or foreign bank account), a legal-representative/proxy block
(excluded — a secondary path used only when someone other than the taxpayer
signs), and the taxpayer's own signed declaration plus an optional
tax-advisor countersignature block (excluded — applies only when a paid
preparer completes the return). Pages 2-4 are sheets 24SZJA-A/B/C — a single
continuous computation running rows 1-96: Section I (consolidated tax base
income by category, rows 1-22) and its youth/mothers allowances (rows
23-28); Section covering personal/first-married/family allowances (rows
29-44); Section II (tax on the consolidated base, rows 45-49); Section III
(agricultural producer tax allowance, rows 50-51); Section IV ("other
data", rows 55-58); Section V (final 2024 settlement — total liability,
withholding, quarterly advance tax, balance due/refundable, installment
election, rows 61-81); Section VI (EKHO settlement, rows 90-91); Section
VII (social contribution tax settlement, rows 95-96). Pages 5-30 are 24
further companion detail sheets for specific declarant types: the 1+1%
designation (EGYSZA), dependents/young-mothers-allowance eligibility
declarations (II-IV), interest-income detail (05/06), swap-transaction
income (07), EKHO detail (08-01/08-02), social contribution tax detail
(09), a transfer/refund request (170), agricultural producer detail
(12-01/02/03), individual entrepreneur detail (13-01 through 13-08), a
supplementary declaration under the personal income tax act (14), and
self-revision annexes (16-01/16-02).

## Scope: sections and fields excluded from this v1.0.0

This version models the **main declaration only** — the cover sheet's
applicant-facing identification/return-type/refund-routing/declaration
fields, plus sheets A/B/C's full rows 1-81 (excluding rows 90-96, which
report outputs computed *from* the EKHO and social-contribution-tax
companion sheets this version does not model). Excluded, and banked as open
backlog for a future minor version, matching this registry's established
main-form-now/companion-schedules-later precedent (Kazakhstan's
220.00/250.00 series; Tunisia's `dgi/irpp-declaration@1.0.0`):

- **All 24 companion detail sheets** (pages 5-30) — the 1+1% designation,
  dependents/young-parent-allowance eligibility declarations, interest
  income, swap-transaction income, EKHO settlement detail, social
  contribution tax detail, the transfer/refund request form, agricultural
  producer income detail, individual entrepreneur income/loss detail, the
  supplementary declaration, and the self-revision annexes. Each applies
  only to a specific declarant type (agricultural producers, individual
  entrepreneurs, EKHO-taxed performers/athletes, taxpayers with foreign
  interest income, taxpayers claiming dependents, or those filing a
  self-revision) rather than to every filer.
- **The code-box checklist of attached companion sheets** (cover sheet,
  section (C)) — pure cross-referencing metadata naming quantities of
  sheets this version does not model.
- **The legal-representative/authorized-proxy block** (cover sheet, section
  (E)) — completed only when someone other than the taxpayer signs on
  their behalf, a secondary path.
- **The tax-advisor/countersigning-preparer block** (cover sheet, section
  (F)'s second half) — completed only when a paid tax advisor or expert
  prepares the return, not by the taxpayer themselves.
- **Rows 90-91 (EKHO settlement) and 95-96 (social contribution tax
  settlement)** — each is a pure output computed from a companion sheet
  (08-01/08-02, 09 respectively) this version does not model; including
  them without their source sheets would invite fabricated values.
- **Domestic postal money-order address** (cover sheet section (D)) — the
  fallback payment-routing path for taxpayers with no bank account at all;
  excluded in favor of the two more common paths (domestic bank account,
  foreign bank account) already modelled.

## Scope: field-collapsing judgment calls

1. **`addressStreetLine` collapses seven separate printed boxes** (street
   name, street type, house number, building, staircase, floor, door) into
   one free-text field, matching this registry's precedent for collapsing
   minor multi-part address subdivisions the source does not itself gate
   logic on.
2. **`foreignBankAccountDetails` collapses eight separate printed boxes**
   (account holder name, account number, country code, currency, IBAN
   yes/no indicator, SWIFT code, institution name, institution address)
   into one free-text field — this is a secondary payment-routing path used
   only by taxpayers without a Hungarian bank account.
3. **Rows 1-21's per-category `a`/`b`/`c` (revenue/cost) sub-columns are
   collapsed to each row's declared income (`d`) figure only.** Most rows
   in practice populate only the income column directly; modelling every
   category's separate revenue and cost sub-figures across 21 rows would
   roughly double this schema's size for line items this version's
   `description`/`sourceRef` text already documents precisely enough to
   locate on the source.
4. **Rows 8-12 (informational sub-portions of row 7's self-employment
   income for specific professional categories — real-estate rental,
   European Parliament members, local-council members, statutory auditors,
   other contract work)** are excluded — each is explicitly marked on the
   source ("nem figyelembe veendő sor" — not to be counted again) as a
   narrow-professional-category breakout that does not change the row-22
   total, not a distinct declarable amount.
5. **Purely mechanical intermediate-subtraction rows are excluded** (e.g.
   rows 24/26/28/30/32/36/38/39/40/43/44/48/69/76/77, each a simple
   difference or sum of two or more already-modelled or excluded fields) —
   kept are the genuinely independent declared amounts (the allowance
   figures themselves) and the headline checkpoint totals a downstream
   consumer needs (`consolidatedTaxBaseIncomeTotal`, `taxOnConsolidatedBase`,
   `totalTaxLiability2024`, `taxPayablePerReturn`/`taxRefundable`).
6. **`addressCountry`/`addressCity`/`addressStreetLine` are modelled from
   the cover sheet's own "külföldi cím" (foreign address) heading**, since
   this one-page cover sheet provides no separate, distinct domestic-address
   block; treated here as the taxpayer's general address (defaulting to
   Hungary for domestic filers) rather than invent a second address block
   the source does not print.

## Scope: judgment calls on requiredness and conditional logic

This specimen carries no asterisk/mandatory-marking convention for most
lines (unlike, e.g., the Schengen visa form's `*`-flagged boxes), so
requiredness was assigned by engineering judgment: core
identification/income-total/tax-total/signature fields required, all
individual income-category and allowance line items left optional (most
taxpayers populate only a handful of the 21 income rows and several
allowance rows, depending on their own circumstances).

1. **`correctedReturnBarcode` gated on `returnType` `notEquals` `"ORIGINAL"`.**
   Safe here because `returnType` is itself an unconditionally `required`
   field (always present), avoiding this registry's own documented
   `notEquals`-against-an-absent-optional-field trap.
2. **`domesticBankAccountNumber` gated on `refundPreference` `in`
   `["FULL_REFUND", "PARTIAL_REFUND_OR_TRANSFER"]`, not `notEquals "NONE"`.**
   `refundPreference` is itself optional (a taxpayer who owes rather than
   is owed money leaves it blank), so an `notEquals` gate would incorrectly
   evaluate `true` — and spuriously require a bank account — whenever
   `refundPreference` is simply absent. `in` against an absent value
   correctly evaluates `false`, the same fix pattern this registry's own
   `notequals-empty-string-absent-field-bug` reference documents. Exercised
   directly as conformance scenario 8 below.
3. **`installmentPaymentMonths` gated on `installmentPaymentRequested`
   `equals` `true`.** `installmentPaymentRequested` is an optional boolean;
   an absent value is treated as `false` by every consumer this registry
   has modelled this pattern for before (e.g. `be/mobilit/...`'s
   `isSpeedPedelec`), so `equals: true` is the safe direction here (no
   absent-vs-false ambiguity, unlike the `notEquals` case above).
4. **`taxPayablePerReturn`/`taxRefundable` are both left plain optional,
   not mutually gated via `requiredWhen`.** The source form's own rows 79
   and 80 are true alternatives (only one produces a positive figure from
   the taxpayer's own arithmetic), but the Condition grammar (GSP-0013) has
   no field-presence/absence primitive to express "required when the other
   field is NOT present" — only value comparisons. Rather than force an
   incorrect encoding, this mutual exclusivity is documented in both
   fields' own `description` text as a real-world business rule outside
   what `requiredWhen` can validate.

## Conformance

11 mock scenarios were exercised programmatically (ephemeral, uncommitted
Node script) against this schema's own `fields[]`/`requiredWhen` conditions:
(1) a minimal valid original return with no refund routing, no correction,
no installment plan — resolves with zero outstanding required fields; (2)
a correction (`CORRECTION`) return without `correctedReturnBarcode` —
correctly flags only that field; (3) the same scenario supplied with the
barcode — resolves cleanly; (4) a self-revision (`SELF_REVISION`) return
without the barcode — correctly flags it; (5) `refundPreference:
FULL_REFUND` without a domestic account number — correctly flags only
`domesticBankAccountNumber`; (6) the same scenario supplied with an
account number — resolves cleanly; (7) `refundPreference: NONE` — the
account number correctly stays optional; (8) `refundPreference` left
entirely unset — confirms the account number is NOT spuriously required
(the specific trap `in` was chosen over `notEquals` to avoid, per the
judgment-call note above); (9) `installmentPaymentRequested: true` without
a month count — correctly flags only `installmentPaymentMonths`; (10) the
same scenario supplied with a month count — resolves cleanly; (11)
`installmentPaymentRequested: false` explicitly — the month count
correctly stays optional. All 11/11 scenarios passed. All three
`requiredWhen` conditions in this schema were exercised both triggered and
untriggered, including the specific absent-optional-field edge case each
was designed to handle safely.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 82 `fields[]` across 8 steps, 1 `documents[]` entry (the taxpayer's
signed accuracy declaration).
