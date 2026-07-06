# Verification record — `ph/bir/annual-income-tax-return-1701a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every field in this schema was read directly from the extracted text layer of
the Bureau of Internal Revenue's own official BIR Form No. 1701A PDF (January
2018 ENCS, with rates), cross-verified against full-page renders of the same
PDF since the form carries no AcroForm/Widget field metadata. It remains
`draft`, not `verified`, pending an independent second reviewer's
field-by-field pass.

## Why this document exists

This `GovSchema Standard Research` cycle (GOV-1466) was scoped to catalog the
existing registry, research missing government portals/systems worth
modeling, and author a new schema. The Philippines opened as the registry's
17th jurisdiction one cycle earlier (GOV-1444, Business Formation) and gained
a second vertical the same day (GOV-1457, National ID & Civic Documents via
COMELEC overseas voter registration), leaving four verticals open: Passport,
DMV, Taxes, Visa. This cycle screened all four in parallel:

- **Passport** (`passport.gov.ph`) — a live, unauthenticated, no-CAPTCHA/WAF
  ASP.NET MVC appointment wizard, confirmed reachable and DOM-walkable using
  the same technique already proven for `br/pf/passport-application` and
  `ph/comelec/overseas-voter-registration`. **Set aside this cycle**, not a
  dead end: see "Candidates rejected or deferred this cycle" below for the
  specific operational reason.
- **DMV** (`lto.gov.ph`, LTO Form No. 21 "Application for Driver's License")
  — a real, text-layer PDF, but `lto.gov.ph` itself is Cloudflare-gated
  (confirmed HTTP 403/bot-challenge on every path tried), so the only
  fetchable copy found was via a third-party CDN mirror
  (`ecgb2r96ego.exactdn.com`) rather than BIR's own domain — a weaker
  provenance chain than the alternatives below. Left as an open backlog
  candidate.
- **Taxes** (`bir.gov.ph`, BIR Form 1700/1701/1701A) — genuine, directly
  downloadable text-layer PDFs on BIR's own CDN (`bir-cdn.bir.gov.ph`), no
  login/CAPTCHA/WAF gate encountered. **Picked this cycle** — see below.
- **Visa** (`immigration.gov.ph`, Bureau of Immigration CGAF forms) — also a
  genuine, directly downloadable text-layer PDF with no blocking, a strong
  alternative candidate. Left as an open backlog candidate for a future
  cycle in favor of Taxes, since BIR 1701A's sourcing was equally clean and
  closing the Taxes vertical closes it globally to 17/17 jurisdictions.

BIR Form 1701A (Annual Income Tax Return for Individuals Earning Income
Purely from Business/Profession, under the Optional Standard Deduction/
graduated-rates method or the 8% flat-rate method) was picked as the
strongest of the remaining candidates: a real, unblocked, primary-source PDF
directly on BIR's own domain, with zero operational side-effect risk (unlike
Passport). This adds the Philippines' third vertical (Taxes) and closes this
registry's global Taxes vertical to **17/17 jurisdictions (100%)**.

## Sources examined

- **Document `(id, version)`:** `ph/bir/annual-income-tax-return-1701a` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bureau of Internal Revenue (BIR), Republic of the Philippines
- **Primary source (directly retrieved, HTTP 200, genuine text layer):**
  <https://bir-cdn.bir.gov.ph/local/pdf/1701A%20Jan%202018%20v5%20with%20rates.pdf>
  — BIR Form No. 1701A (January 2018 ENCS, with rates), ~985KB, 2 pages.
  Fetched directly with no login, CAPTCHA, or WAF gate.
- **Corroborating siblings identified but not used (same domain, same
  access shape):** BIR Form 1700 (`1700%20Jan%202018%20ENCS%20v6.pdf`, for
  taxpayers earning purely compensation income) and BIR Form 1701
  (`1701%20Jan%202018%20final%20with%20rates.pdf`, for taxpayers with mixed
  income or income exceeding the 8%-option threshold) — both confirmed
  fetchable in the same way, left as open backlog candidates for a future
  cycle (each a distinct filing population from 1701A's, not a duplicate).
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the PDF directly via `curl` (HTTP 200, ~985KB, `application/pdf`).
2. Extracted the full text layer with `pdfjs-dist` (legacy build), grouping
   text items by y-coordinate to reconstruct reading order line-by-line.
3. The PDF carries **no AcroForm/Widget field annotations** — it is a flat,
   print-and-fill form (fill in CAPITAL LETTERS, mark boxes with an "X").
   Digit-box counts for boxed fields (TIN, RDO Code, Number of Attachments,
   ZIP Code) are therefore not present in the text layer and were confirmed
   by rendering both pages to high-resolution PNGs (Playwright/Chromium via
   `/paperclip/chrome-sysroot`) and visually counting each box grid.
4. Every checkbox group, line-item label, and cross-reference (e.g. "→ Part
   II Item 20") was read directly from the reconstructed text and confirmed
   against the visual render.

## What was confirmed directly (verbatim, from the form's own printed text)

- The form's full two-page structure: Part I (Background Information on
  Taxpayer/Filer, items 1–19), Part II (Total Tax Payable, items 20–31),
  Part III (Details of Payment, items 32–35 — out of scope, see below), Part
  IV.A (Computation of Income Tax, graduated rates with OSD, items 36–46),
  Part IV.B (Computation of Income Tax, 8% rate, items 47–56), Part IV.C (Tax
  Credits/Payments, items 57–65), and Part V (Background Information on
  Spouse, items 66–75).
- Every field's exact printed label and item number, modeled in each field's
  own `sourceRef`.
- The four Alphanumeric Tax Code (ATC) values are spelled out in full on the
  form itself (II012/II014/II015/II017 with their own descriptive text) —
  no external code table needed, unlike some other jurisdictions' ATC-style
  fields in this registry.
- Both printed tax-rate reference tables (Table 1, effective 2018–2022;
  Table 2, effective 2023 onward) used to manually compute the graduated tax
  due — read but **not modeled as fields**, since they are reference data
  the filer consults, not data the filer enters (see "Out of scope" below).
- The two-column (Taxpayer/Filer, Spouse) structure of Parts II and IV,
  confirmed by the form's own explicit column headers on both parts.
- The exact two-line cap on itemized "other non-operating income" entries in
  both Part IV.A (items 41–42) and Part IV.B (items 50–51), with no stated
  continuation mechanism for a filer with more than two such income
  categories.
- The P250,000 cap printed directly on Part IV.B item 54 (the 8% method's
  allowable reduction for purely self-employed individuals/professionals).

## Interpretive judgment calls disclosed

1. **Checkbox groups modeled as single-select without an explicit "mark
   one" instruction.** Taxpayer Type (items 6/68), Alphanumeric Tax Code
   (items 7/69), and Civil Status (item 16) are each printed as multiple
   checkboxes with no "mark one (1) box only" text (unlike item 30's
   overpayment disposition, which does carry that instruction explicitly).
   Modeled as `enum` (single-select) because the listed categories are
   mutually exclusive by construction, but flagged here for an independent
   reviewer.
2. **TIN modeled as 9 digits, excluding the form's own fixed "00000"
   suffix.** Items 4 and 66 print a 9-digit user-fillable TIN followed by a
   bold, pre-printed, non-editable "00000" branch-code constant — not
   applicant data, so not modeled as part of the `tin`/`spouseTin` fields.
3. **`registeredAddressZipCode`'s box count is inferred, not pixel-counted.**
   Item 9A's ZIP code boxes are embedded inline at the end of a long
   address-line box grid and could not be cleanly counted from the
   rendered page; modeled as the standard 4-digit Philippine postal code
   format by convention.
4. **Part III (Details of Payment) is out of scope for this v1.0.0.** Items
   32–35 form a repeating table across four payment-mode rows (Cash/Bank
   Debit Memo, Check, Tax Debit Memo, Other), each with the same four
   sub-fields (drawee bank/agency, number, date, amount) — structurally a
   repeating container GovSchema v0.3 has no native type for yet (pending
   GSP-0009), consistent with this registry's established practice for
   repeating structures (e.g. `mx/sat/preinscripcion-rfc-persona-moral`'s
   deferred repeating addresses/activities).
5. **The two printed tax-rate tables are not modeled as fields.** They are
   reference data the filer consults to manually compute `taxDueAmount`
   from `gradTotalTaxableIncomeAmount` or `eightTaxableIncomeAfterReductionAmount`
   (whichever pathway applies); `taxDueAmount`'s own description documents
   this computation rather than encoding the tax brackets as schema
   validation, since the applicable table is itself tax-year-dependent and
   would go stale inside a single schema version.
6. **Part IV.C (items 57–63) assumed to carry the same Taxpayer/Spouse
   column split as Parts II and IV.A/IV.B**, even though the form's own
   Part IV.C banner does not repeat the "(columns A/B)" caption verbatim —
   inferred from item 64 ("Total Tax Credits/Payments") flowing directly
   into Part II item 21, which is unambiguously two-column. Flagged for an
   independent reviewer to re-confirm against the rendered page.
7. **Part V (Background Information on Spouse) and every Taxpayer/Spouse
   "B" column field are gated `requiredWhen filingStatus == joint_filing`**,
   on the inference that `separate_filing` means the spouse independently
   files their own BIR Form 1701A rather than appearing on this return at
   all. Not stated explicitly on the form itself; flagged as a judgment
   call.
8. **BIR Form 1700 and BIR Form 1701 are explicitly out of scope.** 1700
   covers taxpayers earning purely compensation income; 1701 covers mixed
   income or income exceeding the 8%-option's ₱3,000,000 threshold — each a
   distinct filing population from 1701A's, not modeled here. Both are
   confirmed-fetchable open backlog candidates for a future cycle.

## What is NOT yet independently verified

- No independent second reviewer's field-by-field pass has occurred yet
  (status remains `draft`).
- No live eBIRForms/eFPS test-filing was performed: eFPS is login-gated (a
  USERNAME/PASSWORD page renders with no blank-field access pre-login), and
  the offline eBIRForms package is a Windows desktop installer, not a web
  wizard reachable from this environment — this document is derived
  entirely from the blank gazetted PDF form, not from a rendered live
  wizard or a completed sample return.
- Item 9A's exact ZIP-code box count (see judgment call 3) and the Part
  IV.C column-split inference (judgment call 6) are both flagged above for
  re-confirmation.

## Candidates rejected or deferred this cycle

- **PH Passport (`passport.gov.ph`)** — confirmed to be a live,
  unauthenticated, no-CAPTCHA/no-WAF ASP.NET MVC wizard (the site step's
  hidden-field DOM was fetched directly and yielded the form's complete
  36-field model: personal identity, family/spouse citizenship, prior
  passport history, emergency contact, occupation, and appointment
  site/region/country selection, the last with real option values for all
  ~40 Philippine appointment sites). Walking further into the wizard to
  observe the personal-information step's own rendered `<select>` option
  lists (Gender, Civil Status, Application Type, Basis of Citizenship)
  required first completing the Schedule step, which calls a real,
  session-backed AJAX endpoint (`/appointment/timeslot`) returning **live,
  genuinely scarce appointment inventory** for real DFA sites (e.g. "12:00-
  13:00 — Available Slots: 1" for DFA Manila/Aseana in the near-term booking
  window). Selecting and submitting one of these slots to advance the
  wizard would consume real capacity meant for an actual Filipino citizen
  needing a passport appointment — judged an unacceptable side effect on a
  live citizen-facing government booking system for the purpose of writing
  a schema, and not done. Left as an open backlog candidate: a future cycle
  could either find a static specimen/instructional source for the
  personal-information step's field set, or accept modeling those specific
  fields as open strings (unknown closed-list options) rather than
  enumerated `enum`s, consistent with this registry's established handling
  of unobserved dropdowns (e.g. `mx/semovi/alta-vehiculo-foraneo`).
- **PH DMV (`lto.gov.ph`, LTO Form No. 21)** — a real, text-layer PDF, but
  only reachable via a third-party CDN mirror since `lto.gov.ph` itself is
  Cloudflare-gated on every path tried (including its own
  `/downloadable-forms/` listing). Left as an open backlog candidate for a
  future cycle that either finds a first-party unblocked copy or accepts
  the third-party-mirror provenance.
- **PH Visa (`immigration.gov.ph`, Bureau of Immigration CGAF forms)** — a
  genuine, directly downloadable, unblocked text-layer PDF, an equally
  strong candidate to BIR 1701A. Not picked this cycle only because Taxes
  was prioritized (closing that vertical globally to 17/17); left as an
  open, strong backlog candidate for a future cycle.
