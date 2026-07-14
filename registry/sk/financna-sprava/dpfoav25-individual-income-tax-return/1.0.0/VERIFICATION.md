# Verification record — `sk/financna-sprava/dpfoav25-individual-income-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2981**, opening **Slovakia**
as this registry's **56th jurisdiction**, via its **Taxes** vertical. This is
a previously-scouted, well-verified candidate carried forward from GOV-2969
and re-confirmed as a live-outage/Wayback-capture case in GOV-2976
(2026-07-14).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i "sk-\|slovak"` and searched for any open PR
referencing `sk/financna-sprava` before starting — neither found an existing
branch or PR for this deliverable, so no reconciliation was needed.

## Live-outage re-check

Re-checked `financnasprava.sk` and `pfseform.financnasprava.sk` at the start
of this cycle (2026-07-14):

```
$ curl -s -o /dev/null -w "HTTP %{http_code} -> %{url_effective}\n" -L https://financnasprava.sk
HTTP 000 -> https://financnasprava.sk/   (connection failure / no response)

$ curl -s -o /dev/null -w "HTTP %{http_code} -> %{url_effective}\n" -L https://pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.620.html
HTTP 200 -> https://servis.financnasprava.sk/odstavka/
```

The forms subdomain still redirects to the same outage page
(`servis.financnasprava.sk/odstavka`) first observed in GOV-2969 and still
live as of GOV-2976 — no ETA published. Per the task brief, the Wayback
Machine capture was used instead of a fresh live fetch.

## Source verification

- **Wayback lookup:** `https://archive.org/wayback/available?url=pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.620.html`
  returned a single available snapshot at timestamp **`20260521100832`**
  (21 May 2026), confirming the source's own `Last-Modified` header
  (22 Apr 2026) predates the capture.
- **Fetched via `curl`** (per this registry's established `WebFetch`
  hard-fails-on-`web.archive.org` workaround — resolve the timestamp via the
  `archive.org/wayback/available` JSON API with `WebFetch`, then `curl` the
  actual snapshot URL from Bash):
  `http://web.archive.org/web/20260521100832/https://pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.620.html`
  — **HTTP 200**, **`Content-Type: text/html`**, the Wayback proxy's own
  `x-archive-orig-content-length` header reports **1,533,265 bytes** for the
  original capture (the rewritten/proxied HTML actually saved locally is
  1,501,443 bytes, reflecting Wayback's own link-rewriting); locally saved
  file **sha256:
  `19a2f118c29b2bbe96929c17c60c6e2c3d16c757835d0d3dad54d9a588aca330`**.
  `memento-datetime: Thu, 21 May 2026 10:08:32 GMT` confirms the capture
  timestamp.
- The document's own `<title>` reads "DPFOAv25 - Daňové priznanie k dani z
  príjmov fyzickej osoby (typ A) za zdaňovacie obdobie 2025 (platné od
  1.1.2026)" — confirming this is the DPFOAv25 individual income-tax-return
  Type A form for the 2025 tax year, effective from 1 January 2026.
- This is a **genuine client-side, JavaScript-rendered fillable HTML e-form**
  (not a PDF/AcroForm): a `<form id="DPFOA2025">` containing real `<input>`,
  `<select>`, and `<textarea>` elements with their own `name`/`id`/
  `maxlength`/`title` (client-side validation-hint) attributes, served
  directly from the Financial Administration's own `pfseform.financnasprava.sk`
  form-template subdomain — a first-party, unauthenticated,
  no-login/CAPTCHA/WAF-gated source (accessible without JavaScript execution
  for extraction purposes, since the raw HTML markup itself carries every
  field's real attributes).

## Field extraction method

Rather than trusting a prior scouting summary, the saved HTML was
independently re-parsed from scratch using Python's `html.parser`
(`HTMLParser` subclass tracking `fieldLabel` spans, `headercorrection`
section-heading divs, and `input`/`select`/`option`/`textarea` elements in
document order) rather than a naive regex — an initial regex-based pass
mis-parsed roughly a dozen `<input>` tags whose own `title` attributes
contained an unescaped `>` character (e.g. formula text like "r.46 > 0"),
which silently truncated the regex match; the `HTMLParser`-based re-parse
independently confirmed every one of those inputs was actually a normal
`type="text"` field with a real `maxlength`, not a malformed/anonymous tag.

Extraction counts, independently tallied from the parsed event stream:

- **172** non-hidden `<input>` elements (**119** `type="text"`, including
  every date field — the source uses `type="text" class="date datepicker"`
  for dates, not a native `type="date"` — plus `tbR36`, whose own raw tag
  had an unescaped `>` inside its `title` attribute that initially broke a
  naive regex parse, independently confirmed a normal `type="text"` field
  via the `HTMLParser` re-parse; **45** `type="checkbox"`; **6**
  `type="radio"`; **1** `type="submit"`; **1** `type="button"`), plus
  **129** `type="hidden"` inputs (confirmed to be pure DOM/layout-section
  anchors carrying no `value` attribute and no applicant-facing label —
  excluded from the field list as structural markers, not data fields).
- **2** `<select>` elements: `KodStatu` (a ~250-entry ISO-style numeric
  country/territory code list per Decree of the Statistical Office of the
  Slovak Republic No. 112/2012 Z.z., as amended by No. 108/2014 Z.z.) and
  `Skryte_pomocne_pole` (a Slovak bank-code lookup list, confirmed to be a
  hidden helper field for the IBAN entry UI, not an applicant-facing field
  itself — excluded).
- **1** `<textarea>` (`OsobitneZaznamy`, the Section IX free-text notes
  field).
- **11** lettered sections (I through XI), confirmed via the
  `headercorrection` heading text — **not** 9 sections as the prior GOV-2969
  scouting note estimated; this cycle corrects that estimate having now
  actually opened and read the full form. Line numbering runs **01 through
  86** (with lettered sub-lines 32a, 56a, 85a), not "~89" as the scouting
  note estimated — also corrected here.

## Field derivation and scoping — 146 fields modeled

The full parsed event stream (`clean_extracted.txt`, 858 lines) was read in
full, section by section, before modeling any field. Scope:

- **Header** (5 fields): return type (ordinary/corrective/additional, from
  the `g1` radio group), taxpayer TIN/birth-number-or-birth-date (r.01/r.02,
  an either/or pair left independently optional — no invented gate, see
  Scoping judgment calls below), tax year (r., enum `[2025, 2026]` per the
  source's own instruction restricting 2026 to a deceased taxpayer's
  return), and the additional-return discovery date (`requiredWhen`
  returnType equals additional).
- **Section I — taxpayer data** (17 fields): name, permanent-address block,
  the non-resident/limited-tax-liability branch (r.11, gating a
  `requiredWhen`-bound non-residency period and Section X's
  `taxResidenceCountry`), and the Slovak-residence-address block used only
  when the taxpayer has no permanent Slovak residence.
- **Section II — legal representative/heir** (13 fields): name, birth
  number, address, and contact phone/email (the source's own footnote 4
  states these two are not mandatory under § 32 ods. 7).
- **Section III — tax-base reduction and child tax bonus** (24 fields): the
  pension-based reduction (r.27/r.28), spouse non-taxable amount (r.29/r.30),
  **one** dependent child's data (r.31 — the source form prints only a
  single child row; additional children are declared in Section IX free
  text per the source's own r.31a instruction, so no bounded repeating group
  was invented here), and the second-eligible-person shared-claim mechanism
  (r.32/r.32a, § 33 ods. 8).
- **Section IV — mortgage-interest tax bonus** (5 fields): the claim flag
  (r.33) plus its four `requiredWhen`-gated companions (amount, months
  count, loan-accrual start date, loan-agreement date).
- **Section V — tax base from employment income** (6 fields): r.34 through
  r.39, the ordinary/dohody income split and the compulsory-insurance
  breakdown.
- **Section VI — full tax computation** (34 fields): r.40 through r.72 —
  every computed line the source's own client-side script derives from
  other lines (e.g. r.45's 19%/25% bracket formula, r.71/r.72's final
  payable/overpayment formula) is modeled as an ordinary editable `number`
  field, with the governing formula transcribed verbatim into that field's
  own `description`, following this registry's established practice for
  other richly cross-referenced tax-computation forms (e.g. `kr/nts`'s
  year-end tax settlement, which models its own derived lines the same way).
- **Section VII — differences from an additional return** (8 fields): r.73
  through r.80, `requiredWhen`-gated on `returnType` equals `additional`
  where a clean single-condition gate existed (r.73/r.74's own
  cross-reference makes clear these apply only to a dodatočné/additional
  return).
- **Section VIII — 2%/3% tax-share donation** (16 fields): the § 50
  recipient-organization block (r.81/r.82, including the
  volunteering-based 3% eligibility flag) and the § 50aa parent-designation
  block (r.83, two parent slots as printed).
- **Section IX — free-text special records** (6 fields): the has-notes
  flag, the single foreign-employment-income detail row (country code +
  income/expenses), and the free-text notes field itself.
- **Section X — further taxpayer data** (5 fields): r.84 through r.86 plus
  the declaration date, including `taxResidenceCountry`'s clean
  `requiredWhen` gate on `isNonResident`.
- **Section XI — payout/refund request** (7 fields): the four payout-type
  request flags, the mutually-exclusive payout-method enum (postal money
  order / own account / foreign account not own), the `requiredWhen`-gated
  IBAN, and the request date.

## Scoping and modeling judgment calls

- **`taxpayerTin`/`taxpayerBirthDateIfNoTin` (r.01/r.02) left independently
  optional, no invented gate**: the source's own validation note reads
  "Musí byť vyplnené DIČ (rodné číslo) na r.1, alebo dátum narodenia na r.2"
  (either r.1 or r.2 must be filled) — an either/or across two optional
  fields, which the meta-schema's `requiredWhen` (a single field-equals-value
  gate) cannot cleanly express. Disclosed here rather than invented as a
  fabricated `crossFieldValidation` rule, per this registry's own
  established no-invented-gate convention (see e.g. `ke/nrb`'s identical
  reasoning for its own "at least one of five optional fields" case).
- **Two 12-checkbox month-selection grids (Section III, r.31 and r.32)**
  each modeled as one boolean "full year" flag
  (`childBonusFullYear`/`secondEligiblePersonBonusFullYear`) plus one
  comma-separated multi-select-as-string field for individually checked
  months (`childBonusMonths`/`secondEligiblePersonBonusMonths`) — following
  the established multi-select-as-string precedent already used elsewhere in
  this registry (e.g. `fr/france-visas/schengen-visa-application`'s
  means-of-support fields, `us/ca/sos/voter-registration`'s language field),
  pending GSP-0009 (repeating/multi-select gap). Not modeled as 12
  independent boolean fields each, since the source's own title text states
  the "1-12" checkbox and the individual month checkboxes are mutually
  exclusive as a *group*, which neither an `exclusivityGroup` (limited to
  "at most one true across the whole group," which would incorrectly forbid
  checking two individual months at once) nor 12 independent booleans cleanly
  expresses.
- **`foreignEmploymentIncomeCountryCode` modeled as a free-text numeric-code
  string, not `enum`**: the source's own `KodStatu` dropdown lists
  approximately 250 countries/territories; enumerating all of them was
  judged disproportionate to this field's role (a single supplementary
  disclosure row in Section IX), so only a 3-digit numeric-code pattern is
  validated, with the code list itself cited by its governing Decree in the
  field's own description — a disclosed scope decision, not an omission.
- **Computed/derived tax-computation lines (r.39 through r.80) modeled as
  ordinary editable `number` fields**, each field's own `description`
  transcribing the governing formula verbatim from the source's own `title`
  attribute (e.g. `taxAmountUnderSection15`'s 19%/25% bracket formula,
  `taxPayable`'s full r.56-through-r.47 formula) — the source form itself
  presents these as fields its own client-side script populates, not as
  read-only display text, so they are modeled as data fields per this
  registry's precedent for other richly cross-referenced tax forms.
- **`mortgageInterestPaidAmount` (t33_1) modeled `number` despite its raw
  HTML `maxlength="400"`**: cross-referenced against the section's own
  footnote 8 ("Suma zaplatených úrokov za zdaňovacie obdobie, dátum
  uzavretia zmluvy o úvere a dátum začatia úročenia úveru sa uvádza podľa
  potvrdenia...") confirms this line records the interest amount; the
  oversized `maxlength` is disclosed as an artifact of a generic textbox UI
  component shared with unrelated combined-name fields elsewhere on the same
  form (e.g. `tPriezvisko29_1_1`, also `maxlength="400"`), not a literal
  400-character numeric value.
- **`payoutMethod` modeled as a 3-value `enum`** (`postal-money-order`,
  `own-account`, `foreign-account-not-own`) from the source's own
  `PoukazkaUcet` radio group; `payoutIban` `requiredWhen` gated on the
  latter two values (both require an account number), not on
  `postal-money-order`.
- **Classification**: birth numbers (`taxpayerTin` when it carries a rodné
  číslo, `representativeBirthNumberPart1/2`, `spouseBirthNumberPart1/2`,
  `childBirthNumberPart1/2`, `secondEligiblePersonBirthNumberPart1/2`,
  `parentABirthNumberPart1/2`, `parentBBirthNumberPart1/2`, `foreignTin`)
  tagged `sensitive-pii`; plain names/addresses tagged `pii`; `payoutIban`
  tagged `financial`. Plain numeric/enumerated/boolean filing and
  tax-computation fields are left unclassified, matching this registry's
  established precedent.
- **`jurisdiction.level` is `national`** — the Financial Administration is
  Slovakia's national tax authority. **`process.type` is `filing`**,
  **`process.language` is `sk`**, matching this registry's established
  conventions for tax-return forms.

## Conformance run

Two hand-authored valid fixtures under
`conformance/sk/financna-sprava/dpfoav25-individual-income-tax-return/1.0.0/`:

- **`valid-wage-earner-minimal.json`** — a resident wage-earner with no
  pension, spouse, child, or mortgage-interest claims, a small final tax
  payable, and the tax-share-donation/parent-designation opt-outs checked —
  exercises the schema's minimal static-required-field path (`returnType`,
  `taxYear`, `taxpayerSurname`, `taxpayerGivenName`, `totalEmploymentIncome`,
  `declarationDate`).
- **`valid-nonresident-with-child-bonus-and-refund.json`** — a non-resident
  taxpayer filing an additional (corrective, post-deadline) return, with a
  declared non-residency period and foreign TIN, one dependent child
  claimed for the full year, a mortgage-interest bonus claim with all four
  conditional companions supplied, a requested overpayment refund routed to
  an IBAN, and Section IX free-text notes disclosing a second child —
  exercises `requiredWhen` gates across `returnType`, `isNonResident`,
  `claimMortgageInterestBonus`, and `payoutMethod` together.

Ten mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops
  `taxpayerSurname` (static `required: true`).
- **`mutation-control-invalid-enum-value.json`** — sets `returnType` to
  `"revised"`, not one of the enum's 3 values.
- **`mutation-control-invalid-date-format.json`** — sets `declarationDate`
  to `"15-03-2026"`, not the required `YYYY-MM-DD` shape.
- **`mutation-control-invalid-type-income-amount.json`** — sets
  `totalEmploymentIncome` to the string `"twenty-four-thousand"` instead of
  a number.
- **`mutation-control-value-below-minimum.json`** — sets
  `totalEmploymentIncome` to `-500`, below `validation.minimum: 0`.
- **`mutation-control-value-above-maximum.json`** — sets
  `supplementaryPensionContributionsDeduction` to `250`, above
  `validation.maximum: 180`.
- **`mutation-control-missing-conditional-discovery-date.json`** — built
  from the full non-resident fixture (which already carries `returnType:
  "additional"` and its `priorReturnTaxAmount` companion), dropping only
  `additionalReturnDiscoveryDate`.
- **`mutation-control-missing-conditional-mortgage-interest-amount.json`** —
  built from the same full fixture, dropping only
  `mortgageInterestPaidAmount` while `claimMortgageInterestBonus: true`
  and its other three conditional companions remain present.
- **`mutation-control-missing-conditional-nonresident-period.json`** —
  drops only `nonResidentPeriodFrom` while `isNonResident: true` and
  `nonResidentPeriodTo` remain present.
- **`mutation-control-missing-conditional-payout-iban.json`** — drops only
  `payoutIban` while `requestOverpaymentRefund: true` and `payoutMethod:
  "own-account"` remain present.

(Note: three of these mutations are deliberately built from the *fuller*
valid fixture rather than the minimal one, specifically because several
`requiredWhen` gates in this schema share a single trigger field — e.g.
`returnType: "additional"` gates both `additionalReturnDiscoveryDate` and
`priorReturnTaxAmount`, and `claimMortgageInterestBonus: true` gates four
separate companions — so flipping the trigger alone from the minimal
fixture would raise more than one error at once. Isolating exactly one
missing field required starting from a base where every *other* companion
of that trigger was already supplied.)

All twelve fixtures were checked with a from-scratch Node conformance
checker (`/tmp/sk-dpfoav25/validate_conformance.mjs`, not committed — a
disposable script run from an isolated scratch directory, per this
registry's own established practice since no committed conformance-fixture
validator exists) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.enum`/`validation.minimum`/
`validation.maximum`/`validation.pattern`/date-format grammar directly:

```
$ node validate_conformance.mjs schema.json conformance/sk/financna-sprava/dpfoav25-individual-income-tax-return/1.0.0
OK   mutation-control-invalid-date-format.json errors=["declarationDate: invalid date format \"15-03-2026\", expected YYYY-MM-DD"]
OK   mutation-control-invalid-enum-value.json errors=["returnType: value \"revised\" not in enum [\"ordinary\",\"corrective\",\"additional\"]"]
OK   mutation-control-invalid-type-income-amount.json errors=["totalEmploymentIncome: expected type number, got string (\"twenty-four-thousand\")"]
OK   mutation-control-missing-conditional-discovery-date.json errors=["additionalReturnDiscoveryDate: required but missing"]
OK   mutation-control-missing-conditional-mortgage-interest-amount.json errors=["mortgageInterestPaidAmount: required but missing"]
OK   mutation-control-missing-conditional-nonresident-period.json errors=["nonResidentPeriodFrom: required but missing"]
OK   mutation-control-missing-conditional-payout-iban.json errors=["payoutIban: required but missing"]
OK   mutation-control-missing-required-field.json errors=["taxpayerSurname: required but missing"]
OK   mutation-control-value-above-maximum.json errors=["supplementaryPensionContributionsDeduction: value 250 above maximum 180"]
OK   mutation-control-value-below-minimum.json errors=["totalEmploymentIncome: value -500 below minimum 0"]
OK   valid-nonresident-with-child-bonus-and-refund.json errors=[]
OK   valid-wage-earner-minimal.json errors=[]
```

All ten negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
448/448 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
448/448 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens **Slovakia as this registry's 56th jurisdiction**, via its **Taxes**
  vertical (1 of 6). The other five verticals (Passport, National ID, DMV,
  Business Formation, Visa) remain **undiscovered/unscouted for Slovakia** —
  this cycle did not screen them, and no claim is made about their
  availability one way or the other. A future cycle deepening Slovakia
  should scout all five in parallel per this registry's established
  practice.
- `financnasprava.sk`'s site-wide outage (first observed GOV-2969, still
  live as of GOV-2976 and re-confirmed still live in this cycle, GOV-2981,
  on 2026-07-14) means a future re-verification of this schema should first
  re-check whether the live site has recovered, and if so, re-fetch
  `pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.620.html` directly
  rather than continuing to rely on the Wayback capture.
- The two `slovensko.sk` MZV consular eForms noted in GOV-2969/GOV-2976 as
  backup candidates (National ID card request, driving-licence request,
  both scoped to citizens abroad) remain unauthored disclosed backlog for a
  future cycle building out Slovakia's National ID/DMV verticals.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) re-checking whether
`financnasprava.sk` has recovered from its outage, and if so, re-fetching
DPFOAv25 directly from the live site rather than the Wayback capture used
here; (2) confirming whether a later edition of DPFOA has superseded the
2025-tax-year/`platné od 1.1.2026` version modeled here; (3) scouting
Slovakia's other five verticals (Passport, National ID, DMV, Business
Formation, Visa), all currently undiscovered for this jurisdiction.
