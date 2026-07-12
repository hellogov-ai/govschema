# Verification record — `ke/kra/it1-individual-resident-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2535**. It closes Kenya's
**Taxes vertical (3 of 6)**, via the Kenya Revenue Authority's (KRA)
downloadable "IT1 Individual Resident Return" Excel workbook. Kenya went
into this cycle at 2 of 6 verticals (Business Formation via
`ke/brs/cr1-application-to-register-a-company`, GOV-2493; National ID via
`ke/nrb/application-for-identity-card`, GOV-2500). Taxes was Kenya's own
sole open, previously-scouted-in-depth backlog candidate (see CATALOG.md's
Known Gaps history, items 19/21) — Passport, DMV, and Visa were each
already confirmed dead ends in the GOV-2500 cycle (fully online,
login/payment-gated processes with no unauthenticated specimen).

## Why this candidate, and the pre-existing "19.0.3/March 2026" caution

CATALOG.md's own history (item 21, GOV-2517 correction) already flags that
an earlier same-cycle note ("KRA IT1, version 19.0.3, March 2026") could
not be corroborated and remains an **unconfirmed version-number claim,
distinct from the candidate's live status**, which was independently
reconfirmed. This cycle did not chase the "19.0.3" string further (no
19.0.3-named file was found on `kra.go.ke` during this cycle's own fetches
either); it instead used the two files CATALOG.md's own history already
names as workable — `IT1_Individual_Resident_Return_18.0.1latest.xls` (used
as `source.url`) and `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls`
(cross-checked) — and treats the version-string discrepancy as still open
and unresolved, not as evidence against the file's authenticity.

## Sources examined

### Source 1 — `IT1_Individual_Resident_Return_18.0.1latest.xls` (chosen as `source.url`)

- **URL:** `https://www.kra.go.ke/images/publications/IT1_Individual_Resident_Return_18.0.1latest.xls`
- Fetched two independent ways this cycle:
  - `curl -sSkL` (the `-k` flag is required for a real TLS
    certificate/apex-domain mismatch on `kra.go.ke`; `-L` follows the
    redirect from the bare `kra.go.ke` host to `www.kra.go.ke`) — **HTTP
    200**, **3,323,904 bytes**.
  - Node's native `fetch()` (a plain `HEAD` request, no TLS override) also
    resolved this exact URL directly with **HTTP 200** and no certificate
    error surfaced to the Node TLS stack — i.e. the mismatch `curl` needs
    `-k` for is specific to `curl`'s handling of the initial bare-apex
    redirect hop, not a defect in the final `www.kra.go.ke` certificate
    itself. This matters for `tools/verify-sources.mjs`, which uses Node's
    `fetch()` internally: it resolves this URL cleanly with no WARN.
- **`sha256`:** `7c85241bbabc797b9e3c6b708209a32866c4ec9131f9d845d0b87c9734e939e2`
  (computed independently this cycle via `sha256sum`, not copied from any
  prior note).
- Parsed with the `xlsx` npm package (`XLSX.readFile`): confirmed **34
  sheets**, exactly as the candidate's prior scouting described: `Data`,
  `Read Me`, `Errors`, `Validations`, `ValidationList`, `Macros_Disabled`,
  `ImportCsv`, `A_Basic_Info`, `B_Profit_Loss_Account_Self`,
  `B_Profit_Loss_Account_Wife`, `C_Balance_Sheet`, `D_Stock_Analysis`,
  `E1_IDA_CA`, `E2_CA_WTA_WDV`, `E2_CA_WTA_SLM`,
  `E_Summary_of_Capital_Allowance`, `F_Employment_Income`,
  `G_Partnership_Income`, `H_Estate_Trust_Income`,
  `I_Computation_of_Car_Benefit`, `J_Computation_of_Mortgage`,
  `K_Home_Ownership_Saving_Plan`, `L_Computation_of_Insu_Relief`,
  `M_Details_of_PAYE_Deducted`, `N_Installment_Tax_Credits`,
  `O_WHT_Credits`, `P_Advance_Tax_Credits`, `Q_IT_Payment_Credits`,
  `R_DTAA_Credits`, `S_Previous_Years_Losses`,
  `T_Income_Computation_Self`, `T_Income_Computation_Wife`,
  `T_Tax_Computation`, `Sheet1`.
- `A_Basic_Info` cell `B1` reads "Resident Individual Income Tax Return";
  cell `I1` reads `18.0.1`; cell `J1` reads `2`; cell `C2` reads "Version
  18.0.1"; cell `I2`/`J2` read `XLS`/`EXCEL 1997-2003`. No password prompt
  at any point — the file opens and parses cleanly with plain `xlsx`.

### Source 2 — `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls` (cross-check)

- **URL:** `https://www.kra.go.ke/images/publications/Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls`
- Fetched via `curl -sSkL`: **HTTP 200**, **3,406,336 bytes**,
  **`sha256: e7eafe532f472a4d55b5a0d982ee030886be6856e1b40d5cab60a8c0464f2256`**
  (both figures computed independently this cycle).
- Opens cleanly with `xlsx`, no password. Its five in-scope-equivalent
  sheets (`A_Basic_Info`, `F_Employment_Income`,
  `M_Details_of_PAYE_Deducted`, `T_Income_Computation_Self`,
  `T_Tax_Computation`) carry the same field labels, row numbering, and
  sr.-no. structure as the 18.0.1 edition (spot-checked row-by-row for all
  five sheets). No material field-level difference was found between the
  two editions for this schema's in-scope content, so this document is
  authored against 18.0.1 without loss of currency relative to 18.0.9.

### Sibling NOT used — `IT1_Individual_Resident_Return_Version-18.03-Revised.xls`

- This file (same host, different filename) is genuinely
  password/MS-Office-encrypted, per this registry's own prior-cycle
  finding (GOV-2507/GOV-2517). Not fetched again this cycle beyond
  confirming its filename still exists on the Publications page; not used
  as a source.

## Sheet-by-sheet field inventory (in-scope sheets only)

Read cell-by-cell via a custom Node script using `xlsx`'s
`XLSX.utils.decode_range`/`encode_cell`, plus the workbook's own
`Validations` and `ValidationList` sheets (which record each field's
mandatory flag, min/max length, and named-range/validation-macro
references — used to determine `required`/`requiredWhen`, not guessed from
visual asterisks alone).

### `A_Basic_Info` (24 fields modeled)

Section A Part 1 ("Return Information", rows 3-20) supplies
`personalIdentificationNumber`, `typeOfReturn`, `returnPeriodFrom`,
`returnPeriodTo`, and nine Yes/No gating questions
(`hasNonEmploymentIncome` through `hasDisabilityExemptionCertificate`),
plus `declareSpouseIncome`/`spousePin`. `typeOfReturn`'s two enum values
(`original`/`amended`) come from the workbook's own `Data` sheet, column
D/E ("ReturnType"/"Return type code": `Original`/`ORIGINAL`,
`Amended`/`AMENDED`), not invented. Section A Part 2 ("Bank Details", rows
21-27) supplies the five `bank*` fields. Section A Part 6 ("Details of
Exemption Certificate for disability (Self)", row 67) supplies the three
`disabilityExemptionCertificate*` fields, gated on
`hasDisabilityExemptionCertificate`.

**Out of scope within this sheet:** Section A Part 3 (Details of Auditor —
gated on business/self-employment income, out of scope), Section A Part 4
(Landlord Details) and Part 5 (Tenant Details) — both gated on the same
`RetInf.DeclareSelfBusIncome` flag as the business schedules in the
workbook's own `ValidationList` formulas (e.g. row 162's
`IF(RetInf.DeclareSelfBusIncome="Yes", compareValues(...), "NE")`), i.e.
rental income in this workbook is treated as part of the same
business/profession pathway as `B_Profit_Loss_Account_Self`, which this
v1.0.0 does not model. All of Part 3/4/5's "(Wife)" mirror sections are
additionally out of scope per the spousal-pathway exclusion below.

**Disclosed discrepancy:** the five Bank Details field labels (rows 23-27)
each carry a printed "*" (visually implying mandatory), but the workbook's
own `Validations` sheet (rows 16-21) records their `Mandatory` flag as
`N`. This schema follows the authoritative `Validations` sheet and models
all five as optional — not silently "fixed" to match the visual asterisk,
and called out per-field in `schema.json`'s field descriptions.

### `F_Employment_Income` (20 fields modeled, Self section only)

Row 2 is the Self section's header row (columns A-H: PIN of Employer, Name
of Employer, Gross Pay, Allowances/Benefits, Car Benefit Value, Net
Housing Value, Pension Excess, Total Employment Income); row 3 is the
sheet's single visible blank data-entry row before its row-5 Total. This
schema flattens this into a bounded repeating group of 2 employer slots
(`employer1*`/`employer2*`, employer 1 required, employer 2 fully
optional per this registry's bounded-repeating-group convention — see
`ke/brs`'s `officer2*` precedent), disclosing that the source ships only
one visible entry row and that a taxpayer with more than one employer in
the year would insert additional rows (a well-documented pattern in these
KRA-published Excel workbooks). Rows 6-9 (`Total`, "January - March:
Income/Pension", "April-December: Income/Pension") are modeled as four
top-level (not per-employer) fields, since they sit under the section's
`Total` row rather than the per-employer data row; their historical basis
(a mid-year 2020 PAYE-band change under the Finance Act 2020, reconciled
via a Jan-Mar/Apr-Dec split retained through the current 18.0.1 edition,
and mirrored on `T_Tax_Computation` items 12.5a/12.5b) is disclosed in
each field's own description rather than asserted as still legally
relevant in 2026 without independent confirmation.

**Out of scope:** the "(Wife)" mirror section (rows 13-21).

### `M_Details_of_PAYE_Deducted` (8 fields modeled, Self section only, merged into `employerN*`)

Row 2 is the Self section's header row (columns A-G: PIN of Employer, Name
of Employer, Taxable Salary, Tax Payable on Taxable Salary, Amount of Tax
Deducted (PAYE), Amount of Tax Payable or Refundable, spouse code); row 3
is the single blank data-entry row before the row-5 Total, mirroring
`F_Employment_Income`'s own layout exactly. **Disclosed synthesis judgment
call:** this sheet separately lists its own "PIN of Employer"/"Name of
Employer" columns, distinct (as raw named ranges) from
`F_Employment_Income`'s columns of the same name — but both represent the
same employer per taxpayer in substance. Rather than duplicate
`employerNPin`/`employerNName` under a second sheet-specific prefix, this
schema reuses the same `employer1`/`employer2` identity fields already
defined for `F_Employment_Income` and adds only this sheet's four
distinct data columns (`employerNTaxableSalary`,
`employerNTaxPayableOnTaxableSalary`, `employerNTaxDeductedPaye`,
`employerNTaxPayableOrRefundablePaye`) per employer. This satisfies the
task's own instruction to use consistent field names for cross-sheet
references (the PAYE-deducted figure explicitly rolls into
`T_Tax_Computation` item 13.1, modeled here as `payeDeductedFromSalaryTotal`).

**Out of scope:** the "(Wife)" mirror section (rows 9-13).

### `T_Income_Computation_Self` (10 fields modeled, Consolidated column only)

Rows 3-35 present ten numbered lines (1 through 10) across seven columns:
Business, Farming, Rental, Interest, Commission, Other, and Consolidated.
This schema models **only the Consolidated column** (`nonEmploymentProfitOrLoss`
through `nonEmploymentLossCarriedForward`), because the six category
sub-columns each depend entirely on out-of-scope schedules (see below) —
there is no way to populate a Business/Farming/Rental/etc. breakdown
without also modeling `B_Profit_Loss_Account_Self`,
`D_Stock_Analysis`, capital allowances, partnership income, rental detail,
and prior-year losses, none of which is in scope for this v1.0.0. Rows
37-56 ("Part I: Other Disallowable Deductions" and "Part II: Other
Allowable Deductions" itemized name/amount tables) are one level further
out of scope still (sub-schedules of already-out-of-scope lines 4.13/5.5)
and are not modeled. Line 9 (`nonEmploymentAdjustedTaxableIncome`) is the
figure the source explicitly cross-references as feeding
`T_Tax_Computation` item 12.4 ("Net Taxable Income ... + Line Number 9
(Consolidated) ..."), which this schema's `netTaxableIncome` field's own
description quotes.

For the pure-employment filing pathway this schema targets, every one of
these ten fields is normally `0` (see both conformance examples); they
are modeled because they are real, always-present fields on this in-scope
sheet, not because a typical employed filer has non-zero values here.

**Out of scope:** the "(Wife)" mirror sheet, `T_Income_Computation_Wife`,
in its entirety (per the spousal-pathway exclusion below).

### `T_Tax_Computation` (24 fields modeled, Self column only)

Rows 3-31 present the final computation: total deductions (11, 11.1-11.3),
total tax payable less reliefs (12, 12.1-12.7), tax credits (13,
13.1-13.8), and the bottom-line tax due/refund due (14). This schema
models the `Self` (column C) values only, per the spousal-pathway
exclusion below. Several of these fields' underlying detail computations
live in out-of-scope companion sheets — `mortgageInterestDeduction` (11.2,
from `J_Computation_of_Mortgage`), `homeOwnershipSavingsPlanDeduction`
(11.3, from `K_Home_Ownership_Saving_Plan`), `taxableEstateTrustIncome`
(12.2) and `estateTrustTaxCredit` (13.2, both from
`H_Estate_Trust_Income`), `insuranceRelief` (12.7, from
`L_Computation_of_Insu_Relief`), `installmentTaxPaidTotal` (13.3, from
`N_Installment_Tax_Credits`), `withholdingTaxCredit` (13.4, from
`O_WHT_Credits`), `commercialVehicleAdvanceTaxCredit` (13.5, from
`P_Advance_Tax_Credits`), `incomeTaxPaidInAdvance` (13.6, from
`Q_IT_Payment_Credits`), `dtaaTaxCredit` (13.7, from `R_DTAA_Credits`), and
`rentalWithholdingTaxCredit` (13.8, from the out-of-scope rental
detail) — each is modeled as the top-level total the in-scope
`T_Tax_Computation` sheet itself presents, with its out-of-scope source
disclosed in the field's own description, per the task's disclosure
convention rather than silently omitting the field.

**Disclosed ambiguity 1 (not resolved by this schema):** the source's own
column `F6` comment on row 6 (11.2, Mortgage Interest) reads verbatim:
*"Check required that either of the two deductions will be available.
Check to be given here or sections or on validation?"* — i.e. the
workbook's own authors left open whether 11.2 and 11.3 are meant to be
mutually exclusive. Quoted verbatim in `mortgageInterestDeduction`'s
description; this schema does not add a `requiredWhen`/exclusivity rule
resolving it.

**Disclosed ambiguity 2 (not resolved by this schema):** the source's own
column `F18` comment on row 18 (12.6, Personal Relief) reads verbatim:
*"Keep it 13,944 but make it configurable"* — i.e. `13,944` (Ksh/year) is
flagged by the workbook's own authors as a template default, not an
asserted-current legal figure. This schema's `personalRelief` field
quotes this comment verbatim and does not assert `13,944` is Kenya's
currently legislated personal relief amount; the conformance examples use
it only because it is the figure the source itself embeds.

**Disclosed ambiguity 3 (quoted, not independently verified):** the
source's own column `F15` comment on row 15 (12.5, Tax on Taxable Income)
records five tax bands verbatim, including Indian-style digit grouping as
printed in the source ("0 to 1,21,968 (10%)", "1,21,969 to 2,36,880
(15%)", "2,36,881 to 3,51,792 (20%)", "3,51,793 to 4,66,704 (25%)", "Over
4,66,704 (30%)"). Quoted verbatim in `taxOnTaxableIncome`'s description
without reformatting or independent verification that these remain
Kenya's currently legislated bands in 2026 (Kenya's Income Tax Act bands
have changed by Finance Act amendment before). The conformance examples'
`taxOnTaxableIncome` figures are computed by applying these exact quoted
bands to the example's `netTaxableIncome`, for internal consistency only —
not as a claim of current legal accuracy.

**Out of scope:** the "(Wife)" column (column D) throughout.

## Spousal-pathway exclusion (applies across all five in-scope sheets)

Kenyan tax law permits a married resident taxpayer to elect joint spousal
filing (Section A Part 1's "Do you want to declare Wife's Income?"). This
v1.0.0 deliberately scopes to the taxpayer's own ("Self") computation only.
`declareSpouseIncome` and `spousePin` are modeled (they are real,
always-present fields on the in-scope `A_Basic_Info` sheet), but no
downstream spousal computation is modeled: every sheet's "(Wife)" mirror
section — `F_Employment_Income`, `M_Details_of_PAYE_Deducted`,
`T_Income_Computation_Wife`, and `T_Tax_Computation`'s Wife column — is out
of scope. A future companion-schedule cycle could add a parallel
`spouse1*`/`spouse2*` employer/PAYE structure plus a `T_Income_Computation_Wife`
consolidated-column set, mirroring this document's own Self-side design.

## Out-of-scope companion-schedule candidates (future cycle)

Per the task's own explicit list, none of these were modeled, each for the
reason given:

- `B_Profit_Loss_Account_Self` / `B_Profit_Loss_Account_Wife`,
  `C_Balance_Sheet`, `D_Stock_Analysis` — self-employment/business income,
  a materially different filing pathway from pure employment income.
- `E1_IDA_CA`, `E2_CA_WTA_WDV`, `E2_CA_WTA_SLM`,
  `E_Summary_of_Capital_Allowance` — capital allowances, dependent on the
  business-income pathway above.
- `G_Partnership_Income` — partnership income.
- `H_Estate_Trust_Income` — estate/trust income.
- `I_Computation_of_Car_Benefit`, `J_Computation_of_Mortgage`,
  `K_Home_Ownership_Saving_Plan`, `L_Computation_of_Insu_Relief` — each a
  detailed sub-computation whose resulting total already surfaces as a
  field on an in-scope sheet (see `employer1CarBenefitValue`,
  `mortgageInterestDeduction`, `homeOwnershipSavingsPlanDeduction`,
  `insuranceRelief` above).
- `N_Installment_Tax_Credits`, `O_WHT_Credits`, `P_Advance_Tax_Credits`,
  `Q_IT_Payment_Credits`, `R_DTAA_Credits` — tax-credit schedules whose
  totals likewise surface on `T_Tax_Computation` (13.3-13.7 above).
- `S_Previous_Years_Losses` — prior-year loss carryforward, surfaces on
  `T_Income_Computation_Self` as `nonEmploymentLossBroughtForward`.
- `T_Income_Computation_Wife` — spousal computation, see the spousal-
  pathway exclusion above.
- `Read Me`, `Errors`, `Validations`, `ValidationList`, `Macros_Disabled`,
  `ImportCsv`, `Data`, `Sheet1` — workbook plumbing/reference-list sheets,
  not form content. (`Data`, `Validations`, and `ValidationList` were
  nonetheless read as supporting evidence for field enumerations and
  requiredness — see the sheet-by-sheet inventory above.)

## Macro inspectability

The workbook's own `Macros_Disabled` sheet (and the `Read Me` sheet) both
present instructions for enabling macros in older Excel versions, and this
cycle's `xlsx`-based parsing confirms macros do not execute/are stripped
in this published edition. Consequently, exact validation-macro logic
(e.g. the named `validatePIN()` function repeatedly referenced in the
`Validations`/`ValidationList` sheets) is **not independently inspectable**
in this environment. `personalIdentificationNumber`/`spousePin`'s pattern
validation (`^[A-Z]\d{9}[A-Z]$`, 11 characters) is instead based on
Kenya's well-documented public KRA PIN format, not decompiled from the
source macro — disclosed in the field's own description.

## Conformance run (mock, worked examples)

Two hand-authored valid fixtures under
`conformance/ke/kra/it1-individual-resident-return/1.0.0/`:

- **`valid-employed-resident-single-employer-tax-payable.json`** — the
  task's own suggested profile: a single-employer, pure-employment KRA PIN
  holder (`A123456789Z`) with one employer ("Acme Kenya Limited"), gross
  pay Ksh 1,200,000, PAYE already deducted Ksh 270,000, a Ksh 24,000
  pension-contribution deduction, the source's own quoted Ksh 13,944
  personal relief, no non-employment income/credits (all 0), and a
  resulting small **tax payable** of Ksh 9,988.80 — computed by applying
  the source's own quoted five-band tax slabs (see "Disclosed ambiguity 3"
  above) to `netTaxableIncome` (Ksh 1,176,000), then subtracting personal
  relief and the PAYE credit.
- **`valid-two-employers-disability-relief-refund-due.json`** — exercises
  the bounded second employer slot, `declareSpouseIncome`/`spousePin`
  (spouse-declaration flag set, no downstream spousal computation
  modeled, consistent with the disclosed exclusion above), a disability
  exemption certificate (all three certificate fields present), and the
  optional bank-details block, resulting in a **refund due** (negative
  `taxDueOrRefundDue`, Ksh -15,011.20).

Both were checked with a from-scratch Node conformance checker (validates
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` per field against the instance; not a copy of any
other document's checker):

```
$ node check_conformance.mjs schema.json \
    valid-employed-resident-single-employer-tax-payable.json \
    valid-two-employers-disability-relief-refund-due.json
valid-employed-resident-single-employer-tax-payable.json: 0 error(s)
valid-two-employers-disability-relief-refund-due.json: 0 error(s)
```

Three mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops
  `personalIdentificationNumber` (a static `required: true` field) from
  the single-employer valid fixture.
- **`mutation-control-missing-conditional-spouse-pin.json`** — sets
  `declareSpouseIncome: true` on the single-employer valid fixture without
  adding the now-`requiredWhen`-triggered `spousePin`.
- **`mutation-control-missing-conditional-disability-certificate.json`**
  — starts from the two-employer valid fixture (which already has
  `hasDisabilityExemptionCertificate: true` and all three certificate
  fields present) and drops only `disabilityExemptionCertificateNumber`,
  isolating exactly one `requiredWhen` violation rather than firing all
  three certificate fields' shared gating condition at once.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-missing-conditional-spouse-pin.json \
    mutation-control-missing-conditional-disability-certificate.json
mutation-control-missing-required-field.json: 1 error(s)
  - personalIdentificationNumber: required but missing
mutation-control-missing-conditional-spouse-pin.json: 1 error(s)
  - spousePin: required but missing
mutation-control-missing-conditional-disability-certificate.json: 1 error(s)
  - disabilityExemptionCertificateNumber: required but missing
```

All three negative controls raised exactly one error each, and neither
valid scenario raised an unexpected error — no defects were found in the
schema itself during this authoring pass.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/ke/kra/it1-individual-resident-return/1.0.0/schema.json
ok   registry/ke/kra/it1-individual-resident-return/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ke/kra/it1-individual-resident-return/1.0.0/schema.json
ok   registry/ke/kra/it1-individual-resident-return/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/ke/kra/it1-individual-resident-return/1.0.0`
was run clean (no allowlist entry needed — both cited `kra.go.ke` URLs
resolve via Node's `fetch()` with no TLS override, per the note under
Source 1 above) immediately before opening this PR.

## Scope and jurisdiction notes

- This is Kenya's Taxes vertical's first document, bringing Kenya to **3 of
  6 verticals** (Business Formation, National ID, Taxes). Passport, DMV,
  and Visa remain confirmed dead ends (see GOV-2500's own VERIFICATION.md);
  no vertical remains open-and-unscreened for Kenya after this cycle.
- `jurisdiction.level` is `national` — KRA is Kenya's national tax
  authority.
- `process.type` is `filing`, consistent with this registry's other annual
  individual income tax returns (e.g. `pe/sunat/formulario-virtual-709-declaracion-renta`,
  `fi/vero/50a-earned-income-and-deductions`).
- `version` set to `1.0.0`: this document models one complete,
  self-contained procedural scope (the pure-employment resident-individual
  pathway) in full; the excluded business/farming/rental/partnership/
  estate-trust/capital-allowance/credit schedules and the spousal pathway
  are disclosed companion-schedule candidates, not sibling-variant
  ambiguities.
- No `documents[]` array: the in-scope sheets do not themselves specify
  any required physical-document attachment (this is a self-declared
  return workbook, historically uploaded through KRA's login-gated iTax
  portal rather than filed with supporting documents attached to the
  workbook itself); this is a disclosed absence, not an oversight.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) independently confirming
Kenya's currently legislated personal relief amount and tax bands, given
this document's own disclosed caveats about the source's embedded
`13,944`/tax-slab comments; (2) the self-employment/business-income
pathway (`B`/`C`/`D`/`E*` sheets) as the strongest companion-schedule
candidate, since it is the single largest scope carve-out in this
document; (3) re-resolving the still-unconfirmed "19.0.3/March 2026"
version-number claim noted in CATALOG.md's own history, in case a newer
edition surfaces on `kra.go.ke` by the next review.
